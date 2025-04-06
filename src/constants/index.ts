const LIMIT = 8;

export const API_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${LIMIT}`;

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
}

export enum AllReducer {
  TODOS = 'todos',
}
