import { configureStore } from '@reduxjs/toolkit';
import userSlice, { fetchUsers, initialState, selectSortedUsers } from './usersSlice';
import { getUsers } from '@utils/api/usersApi';
import { expect, describe } from '@jest/globals';
import { RootState } from '@utils/store';
import { TUser } from 'types/user';
import { TTodo } from 'types/todo';

jest.mock('@utils/api/usersApi', () => ({
  getUsers: jest.fn(),
}));

describe('Проверяем корректность работы userSlice', () => {
  const mockUsers: TUser[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
  ];

  const mockTodos: TTodo[] = [
    { userId: 1, id: 1, title: 'Task 1', completed: false },
    { userId: 1, id: 2, title: 'Task 2', completed: true },
  ];

  const store = configureStore({ reducer: userSlice });
  const testError = 'Ошибка при загрузке данных';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Проверяем правильную инициализацию userSlice', () => {
    const state = store.getState();
    expect(state).toEqual({ isLoading: false, users: [], error: null });
  });

  test('Проверка состояния при запросе данных (pending)', () => {
    const actualState = userSlice(initialState, fetchUsers.pending(''));
    expect(actualState.isLoading).toBe(true);
    expect(actualState.error).toBe(null);
  });

  test('Проверка состояния при успешном получении данных (fulfilled)', async () => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);
    const actualState = userSlice(initialState, fetchUsers.fulfilled(mockUsers, ''));
    expect(actualState.isLoading).toBe(false);
    expect(actualState.users).toEqual(mockUsers);
    expect(actualState.error).toBe(null);
  });

  test('Проверка состояния при ошибке (rejected)', async () => {
    (getUsers as jest.Mock).mockRejectedValue(testError);
    const actualState = userSlice(initialState, fetchUsers.rejected(new Error(testError), ''));
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(testError);
  });

  test('Проверка работы selectSortedUsers', () => {
    const mockState: RootState = {
      users: { users: mockUsers, isLoading: false, error: null },
      todo: { todos: mockTodos, isLoading: false, error: null },
    };

    const selectedUsers = selectSortedUsers(mockState);

    expect(selectedUsers).toEqual([
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        count: 2, // У этого пользователя две задачи
      },
    ]);
  });
});
