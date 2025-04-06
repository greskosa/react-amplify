import { ActionType } from '../constants';
import { AddTodosAction, TodosState } from '../types';

export function TodoReducer(state: TodosState, action: AddTodosAction): TodosState {
  switch (action.type) {
    case ActionType.SET_TODOS:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}
