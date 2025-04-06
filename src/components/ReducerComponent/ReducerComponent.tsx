import { useEffect, useReducer } from 'react';
import TodoList from '../TodoList';
import { TodoReducer } from '../../store/TodoReducer';
import { fetchTodos } from '../../utils/featchTodos';
import { ActionType } from '../../constants';

const ReducerComponent = () => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: [],
  });

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        dispatch({ type: ActionType.SET_TODOS, payload: todos });
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  return (
    <>
      <h3>React useReducer</h3>

      <TodoList todos={state.todos} />
    </>
  );
};

export default ReducerComponent;
