export type Todo = { id: number; title: string; completed: boolean };

export type TodosState = { todos: Array<Todo> };

export type AddTodosAction = {
  type: 'SET_TODOS';
  payload: Array<Todo>;
};

export type ZustandTodoStore = TodosState & {
  fetchTodos: () => void;
};
