import produce from 'immer';
import { CyclesActionTypes } from './actions';

export type Cycle = {
  id: string;
  task: string;
  minutes: number;
  startedAt: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
};

type CyclesState = {
  cycles: Cycle[];
  activeCycleId: string | null;
};

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case CyclesActionTypes.ADD_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case CyclesActionTypes.FINISH_CYCLE:
      return produce(state, draft => {
        const activeCycle = draft.cycles.find(
          cycle => cycle.id === draft.activeCycleId
        );
        if (activeCycle) {
          activeCycle.finishedAt = new Date();
        }
        draft.activeCycleId = null;
      });
    case CyclesActionTypes.STOP_CYCLE:
      return produce(state, draft => {
        const activeCycle = draft.cycles.find(
          cycle => cycle.id === draft.activeCycleId
        );
        if (activeCycle) {
          activeCycle.stoppedAt = new Date();
        }
        draft.activeCycleId = null;
      });
  }

  return state;
};
