import { useContext } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

const formSchema = z.object({
  task: z.string().min(1),
  minutes: z.number().int().min(5).max(60),
});

type FormSchema = z.infer<typeof formSchema>;

export const Home = () => {
  const { handleStartNewCycle, handleStopCycle, activeCycle } =
    useContext(CyclesContext);

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

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleStartNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

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
