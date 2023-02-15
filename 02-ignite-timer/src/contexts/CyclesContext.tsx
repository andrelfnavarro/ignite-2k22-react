import { createContext, useState } from 'react';

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

export const CyclesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [totalSecondsPassed, setTotalSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const setSecondsPassed = (secondsPassed: number) => {
    setTotalSecondsPassed(secondsPassed);
  };

  const markActiveCycleAsFinished = () => {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedAt: new Date(),
          };
        }

        return cycle;
      })
    );
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startedAt: new Date(),
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setTotalSecondsPassed(0);
  };

  const stopCurrentCycle = () => {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            stoppedAt: new Date(),
          };
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
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
