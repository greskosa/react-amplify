import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getTodos, RootState } from '../../store/TodoRtkStore';
import TodoList from '../TodoList';

export const RtkTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <h3>Redux Toolkit Store</h3>
      <TodoList todos={todos} />
    </>
  );
};
