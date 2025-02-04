import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '@utils/api/usersApi';
import { RootState } from '@utils/store';
import { TTodo } from 'types/todo';
import { TUser } from 'types/user';

interface usersState {
  isLoading: boolean;
  users: TUser[];
  error: string | null;
}

const initialState: usersState = {
  isLoading: false,
  users: [],
  error: null,
};

const selectUsers = (state: RootState) => state.users.users;
const selectTodos = (state: RootState) => state.todo.todos;

export const selectSortedUsers = createSelector(
  [selectUsers, selectTodos],
  (users: TUser[], todos: TTodo[]) => {
    return users.map((user: TUser) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      count: todos.filter((todo: TTodo) => todo.userId === user.id).length,
    }));
  },
);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    return rejectWithValue((error as Error).message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // обработка при загрузке
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // обработка при успешном получении данных
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // обработка при ошибке
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || 'Ошибка при загрузке данных';
    });
  },
});

export default usersSlice.reducer;
