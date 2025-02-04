import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodosApi } from '@utils/api/todosApi';
import { TTodo } from 'types/todo';

interface todoState {
  isLoading: boolean;
  todos: TTodo[];
  error: string | null;
}

const initialState: todoState = {
  isLoading: false,
  todos: [],
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const todos = await getTodosApi();
    return todos;
  } catch (error) {
    console.error('Ошибка при получении списка дел:', error);
    return rejectWithValue((error as Error).message);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обработка при загрузке
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // обработка при успешном получении данных
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // обработка при ошибке
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || 'Ошибка при загрузке данных';
    });
  },
});

export default todoSlice.reducer;
