import { createContext, useReducer, useState } from 'react';

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}

interface CreateCycleData {
  task: string;
  minutes: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markActiveCycleAsFinished: () => void;
  totalSecondsPassed: number;
  setSecondsPassed: (secondsPassed: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  stopCurrentCycle: () => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

type CyclesState = {
  cycles: Cycle[];
  activeCycleId: string | null;
};

export const CyclesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case 'FINISH_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === action.payload.activeCycleId) {
                return {
                  ...cycle,
                  finishedAt: new Date(),
                };
              }
              return cycle;
            }),
            activeCycleId: null,
          };
        case 'STOP_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === action.payload.activeCycleId) {
                return {
                  ...cycle,
                  stoppedAt: new Date(),
                };
              }
              return cycle;
            }),
            activeCycleId: null,
          };
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const [totalSecondsPassed, setTotalSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const setSecondsPassed = (secondsPassed: number) => {
    setTotalSecondsPassed(secondsPassed);
  };

  const markActiveCycleAsFinished = () => {
    dispatch({
      type: 'FINISH_CYCLE',
      payload: {
        activeCycleId,
      },
    });
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startedAt: new Date(),
    };

    dispatch({
      type: 'ADD_CYCLE',
      payload: { newCycle },
    });

    setTotalSecondsPassed(0);
  };

  const stopCurrentCycle = () => {
    dispatch({
      type: 'STOP_CYCLE',
      payload: {
        activeCycleId,
      },
    });
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markActiveCycleAsFinished,
        totalSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
