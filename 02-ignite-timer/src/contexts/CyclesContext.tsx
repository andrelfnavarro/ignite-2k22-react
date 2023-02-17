import { differenceInSeconds } from 'date-fns';
import { createContext, useEffect, useReducer, useState } from 'react';
import {
  addCycleAction,
  finishCycleAction,
  stopCycleAction,
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

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

const localStorageKey = '@ignite-timer:cycles-state-1.0.0';

export const CyclesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    initialState => {
      const cyclesFromLocalStorage = localStorage.getItem(localStorageKey);

      if (cyclesFromLocalStorage) {
        return JSON.parse(cyclesFromLocalStorage);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [totalSecondsPassed, setTotalSecondsPassed] = useState(() => {
    if (!activeCycle) return 0;

    const secondsPassed = differenceInSeconds(
      new Date(),
      new Date(activeCycle.startedAt)
    );

    return secondsPassed;
  });

  const setSecondsPassed = (secondsPassed: number) => {
    setTotalSecondsPassed(secondsPassed);
  };

  const markActiveCycleAsFinished = () => {
    dispatch(finishCycleAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startedAt: new Date(),
    };

    dispatch(addCycleAction(newCycle));

    setTotalSecondsPassed(0);
  };

  const stopCurrentCycle = () => {
    dispatch(stopCycleAction());
  };

  useEffect(() => {
    const cyclesStateJson = JSON.stringify(cyclesState);

    localStorage.setItem(localStorageKey, cyclesStateJson);
  }, [cyclesState]);

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
