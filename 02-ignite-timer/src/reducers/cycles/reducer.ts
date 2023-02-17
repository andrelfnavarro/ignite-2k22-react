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
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case CyclesActionTypes.FINISH_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === action.payload.activeCycleId) {
            return {
              ...cycle,
              finishedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
    case CyclesActionTypes.STOP_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === action.payload.activeCycleId) {
            return {
              ...cycle,
              stoppedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
  }

  return state;
};
