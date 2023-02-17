import { Cycle } from './reducer';

export enum CyclesActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE',
}

export const addCycleAction = (newCycle: Cycle) => ({
  type: CyclesActionTypes.ADD_CYCLE,
  payload: {
    newCycle,
  },
});

export const finishCycleAction = () => ({
  type: CyclesActionTypes.FINISH_CYCLE,
});

export const stopCycleAction = () => ({
  type: CyclesActionTypes.STOP_CYCLE,
});
