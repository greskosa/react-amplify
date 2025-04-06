import { FC, ReactNode, useEffect, useState } from 'react';
import { TodosContext } from '../../store/TodoContext';
import { Todo } from '../../types';
import { fetchTodos } from '../../utils/featchTodos';

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  return (
    <TodosContext.Provider value={{ todos }}>
      <h3>React Context API</h3>
      {children}
    </TodosContext.Provider>
  );
};
