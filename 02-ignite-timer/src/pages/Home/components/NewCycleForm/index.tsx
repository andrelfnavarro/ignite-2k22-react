import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormContainer, MinutesInput, TaskInput } from './styles';

const formSchema = z.object({
  task: z.string().min(1),
  minutes: z.number().int().min(5).max(60),
});

type FormSchema = z.infer<typeof formSchema>;

export const NewCycleForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  });

  return (
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
  );
};
