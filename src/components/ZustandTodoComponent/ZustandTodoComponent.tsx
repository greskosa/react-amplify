import { useEffect } from 'react';
import { useTodoStore } from '../../store/TodoZustand';
import TodoList from '../TodoList';

export const ZustandTodoComponent = () => {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <h3>Zustand store</h3>
      <TodoList todos={todos} />
    </>
  );
};
