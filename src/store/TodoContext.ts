import { createContext } from 'react';
import { Todo } from '../types';

export const TodosContext = createContext<{
  todos: Array<Todo>;
}>({
  todos: [],
});
