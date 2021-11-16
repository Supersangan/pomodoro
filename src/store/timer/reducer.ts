import { ActionCreator, Reducer } from 'redux';
import { ETimerModes } from '../../Pomodoro/Timer';
import { ITimer } from '../reducer';

// SET MODE
export const TIMER_SET_MODE = 'TIMER_SET_MODE';

export type TSetTimerMode = {
  type: typeof TIMER_SET_MODE;
  mode: ETimerModes;
};

export const actionSetTimerMode: ActionCreator<TSetTimerMode> = (mode) => ({
  type: TIMER_SET_MODE,
  mode,
});

type TTimerActions = TSetTimerMode;

export const timerReducer: Reducer<ITimer | undefined, TTimerActions> = (
  state,
  action
) => {
  switch (action.type) {
    case TIMER_SET_MODE:
      return {
        ...state,
        mode: action.mode,
      };

    default:
      return state;
  }
};
