import { useContext } from 'react';
import { TodosContext } from '../../store/TodoContext';
import TodoList from '../TodoList';

export const TodosContextComponent = () => {
  const { todos } = useContext(TodosContext);

  return <TodoList todos={todos} />;
};
