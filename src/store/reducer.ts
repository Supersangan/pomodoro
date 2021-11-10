import { Reducer } from 'redux';
import { ITodoProps } from '../Pomodoro/Todos/TodoList/TodoItem';
import { loadState } from '../utils/localstorage';
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
  TODO_RENAME,
  TRenameTodoAction,
  TSwapTodosAction,
} from './todos/reducer';

export type TRootState = {
  todos: ITodoProps[];
};

const initialState: TRootState = loadState();

type TMyAction = TAddTodoAction | TIncrementTodoAction | TDecrementTodoAction | TRenameTodoAction | TDeleteTodoAction | TSwapTodosAction;

export const rootReducer: Reducer<TRootState, TMyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TODO_ADD:
    case TODO_INCREMENT:
    case TODO_DECREMENT:
    case TODO_RENAME:
    case TODO_DELETE:
    case TODOS_SWAP:
      return {
        ...state,
        todos: todosReducer(state?.todos, action),
      };

    default:
      return state;
  }
};