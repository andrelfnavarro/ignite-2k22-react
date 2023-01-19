import { useEffect, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles';
import { differenceInSeconds } from 'date-fns';

const formSchema = z.object({
  task: z.string().min(1),
  minutes: z.number().int().min(5).max(60),
});

type FormSchema = z.infer<typeof formSchema>;

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [totalSecondsPassed, setTotalSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const { register, handleSubmit, watch, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  });

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - totalSecondsPassed : 0;

  const currentMinutesLeft = Math.floor(currentSeconds / 60);
  const currentSecondsLeft = currentSeconds % 60;

  const formattedCurrentMinutesLeft = String(currentMinutesLeft).padStart(
    2,
    '0'
  );
  const formattedCurrentSecondsLeft = String(currentSecondsLeft).padStart(
    2,
    '0'
  );

  const task = watch('task');
  const isSubmitDisabled = !task;

  useEffect(() => {
    if (!activeCycle) return;

    const interval = setInterval(() => {
      const secondsPassed = differenceInSeconds(
        new Date(),
        activeCycle.startedAt
      );

      if (secondsPassed >= totalSeconds) {
        clearInterval(interval);

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
        setTotalSecondsPassed(totalSeconds);

        return;
      }

      setTotalSecondsPassed(secondsPassed);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if (!activeCycle) return;

    document.title = `${formattedCurrentMinutesLeft}:${formattedCurrentSecondsLeft}`;
  }, [formattedCurrentMinutesLeft, formattedCurrentSecondsLeft]);

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
        <FormContainer>
          <label htmlFor="task">I'm going to work on</label>

          <TaskInput
            id="task"
            type="text"
            placeholder="Your project's name"
            list="projects"
            {...register('task')}
          />

          <datalist id="projects">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="minutes">for</label>
          <MinutesInput
            id="minutes"
            type="number"
            step={5}
            placeholder="00"
            {...register('minutes', {
              valueAsNumber: true,
            })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{formattedCurrentMinutesLeft[0]}</span>
          <span>{formattedCurrentMinutesLeft[1]}</span>
          <Separator>:</Separator>
          <span>{formattedCurrentSecondsLeft[0]}</span>
          <span>{formattedCurrentSecondsLeft[1]}</span>
        </CountdownContainer>

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
