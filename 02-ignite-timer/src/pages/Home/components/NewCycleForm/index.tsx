import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CyclesContext } from '../..';
import { FormContainer, MinutesInput, TaskInput } from './styles';

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I'm going to work on</label>

      <TaskInput
        id="task"
        type="text"
        placeholder="Your project's name"
        list="projects"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('minutes', {
          valueAsNumber: true,
        })}
      />

      <span>minutes.</span>
    </FormContainer>
  );
};
