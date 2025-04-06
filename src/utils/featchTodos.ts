import { API_URL } from '../constants';

export const fetchTodos = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return data;
};
