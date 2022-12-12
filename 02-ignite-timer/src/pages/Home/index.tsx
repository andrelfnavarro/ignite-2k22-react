import { Play } from 'phosphor-react';
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
  TaskInput,
} from './styles';

const formSchema = z.object({
  task: z.string().min(1),
  minutes: z.number().int().min(5).max(60),
});

type FormSchema = z.infer<typeof formSchema>;

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  });

  const handleStartCountdown = (data: any) => {
    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleStartCountdown)}>
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
