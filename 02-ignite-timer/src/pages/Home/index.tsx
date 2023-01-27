import { createContext, useEffect, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm, FormProvider } from 'react-hook-form';
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
  totalSecondsPassed: number;
  setSecondsPassed: (secondsPassed: number) => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

const formSchema = z.object({
  task: z.string().min(1),
  minutes: z.number().int().min(5).max(60),
});

type FormSchema = z.infer<typeof formSchema>;

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [totalSecondsPassed, setTotalSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const setSecondsPassed = (secondsPassed: number) => {
    setTotalSecondsPassed(secondsPassed);
  };

  const newCycleForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

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

  const handleStartNewCycle = (data: FormSchema) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startedAt: new Date(),
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setTotalSecondsPassed(0);

    reset();
  };

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
      <form action="" onSubmit={handleSubmit(handleStartNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markActiveCycleAsFinished,
            totalSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
