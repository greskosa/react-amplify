import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types';
import { fetchTodos } from '../utils/featchTodos';
import { AllReducer } from '../constants';

export const getTodos = createAsyncThunk('todos/get', fetchTodos);

const todoSlice = createSlice({
  name: AllReducer.TODOS,
  initialState: [] as Array<Todo>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (_, action) => action.payload);
  },
});

export const store = configureStore({ reducer: { [AllReducer.TODOS]: todoSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
