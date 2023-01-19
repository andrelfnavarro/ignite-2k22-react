import { createContext, useEffect, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { differenceInSeconds } from 'date-fns';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markActiveCycleAsFinished: () => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  // const task = watch('task');
  // const isSubmitDisabled = !task;

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

  // const handleStartNewCycle = (data: FormSchema) => {
  //   const newCycle = {
  //     id: String(new Date().getTime()),
  //     task: data.task,
  //     minutes: data.minutes,
  //     startedAt: new Date(),
  //   };

  //   setCycles(state => [...state, newCycle]);
  //   setActiveCycleId(newCycle.id);
  //   setTotalSecondsPassed(0);

  //   reset();
  // };

  const handleStopCycle = () => {
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
    <HomeContainer>
      <form
        action=""
        // onSubmit={handleSubmit(handleStartNewCycle)}
      >
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markActiveCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            // disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
