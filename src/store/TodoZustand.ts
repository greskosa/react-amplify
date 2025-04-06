import { create } from 'zustand';
import { ZustandTodoStore } from '../types';
import { fetchTodos } from '../utils/featchTodos';

export const useTodoStore = create<ZustandTodoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      const res = await fetchTodos();
      set({ todos: res });
    } catch (error) {
      console.error('Error fetching todos:', error);
      set({ todos: [] });
    }
  },
}));
