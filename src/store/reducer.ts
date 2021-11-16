import { ActionCreator, Reducer } from 'redux';
import { EModes } from '../Header/ThemesSwitcher';
import { ETimerModes, ETimerStatuses } from '../Pomodoro/Timer';
import { loadState } from '../utils/localstorage';
import { timerReducer, TIMER_SET_MODE, TSetTimerMode } from './timer/reducer';
import {
  TAddTodoAction,
  TDecrementTodoAction,
  TDeleteTodoAction,
  TIncrementTodoAction,
  todosReducer,
  TODOS_SWAP,
  TODO_ADD,
  TODO_DECREMENT,
  TODO_DELETE,
  TODO_INCREMENT,
  TODO_PROGRESS,
  TODO_RENAME,
  TProgressTodoAction,
  TRenameTodoAction,
  TSwapTodosAction,
} from './todos/reducer';

export interface ITodo {
  id: string;
  name: string;
  count: number;
  done: number;
}

export interface ITimer {
  mode?: ETimerModes;
  status?: ETimerStatuses;
}

export interface IStats {
  [index: number]: {
    timeStamp: number;
    totalTime: number;
    productiveTime: number;
    pauseTime: number;
    stops: number;
  };
}

export type TRootState = {
  todos?: ITodo[];
  stats?: IStats;
  timer?: ITimer;
  themeMode?: EModes;
};

const initialState: TRootState = loadState();

// SAVE THEME
const THEME_SAVE = 'THEME_SAVE';

type TSaveThemeAction = {
  type: typeof THEME_SAVE;
  themeMode: EModes;
};

export const actionSaveThemeMode: ActionCreator<TSaveThemeAction> = (
  themeMode
) => ({
  type: THEME_SAVE,
  themeMode,
});

type TMyActions =
  | TSaveThemeAction
  | TAddTodoAction
  | TIncrementTodoAction
  | TDecrementTodoAction
  | TProgressTodoAction
  | TRenameTodoAction
  | TDeleteTodoAction
  | TSwapTodosAction
  | TSetTimerMode;

export const rootReducer: Reducer<TRootState, TMyActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case THEME_SAVE:
      return { ...state, themeMode: action.themeMode };

    case TODO_ADD:
    case TODO_INCREMENT:
    case TODO_DECREMENT:
    case TODO_PROGRESS:
    case TODO_RENAME:
    case TODO_DELETE:
    case TODOS_SWAP:
      return {
        ...state,
        todos: todosReducer(state?.todos, action),
      };

    case TIMER_SET_MODE:
      return {
        ...state,
        timer: timerReducer(state?.timer, action),
      };

    default:
      return state;
  }
};