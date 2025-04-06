import { ITodoListProps } from './types';

const CompletedTodoStyle = {
  textDecoration: 'line-through',
  color: '#888',
};

const TodoList: React.FC<ITodoListProps> = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <span style={{ ...(todo.completed && CompletedTodoStyle) }}>{todo.title}</span>
      </li>
    ))}
  </ul>
);

export default TodoList;
