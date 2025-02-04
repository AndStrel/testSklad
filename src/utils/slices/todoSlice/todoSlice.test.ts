import { configureStore } from '@reduxjs/toolkit';
import todoSlice, { fetchTodos, initialState } from './todoSlice';
import { getTodosApi } from '@utils/api/todosApi';
import { expect, describe, beforeEach, test } from '@jest/globals';

jest.mock('@utils/api/todosApi', () => ({
  getTodosApi: jest.fn(),
}));

describe('Проверяем корректность работы слайса todoSlice.', () => {
  const mockTodos = [
    {
      id: 1,
      userId: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      id: 2,
      userId: 1,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
  ];

  const testError = 'Ошибка при загрузке данных';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Проверяем правильную инициализацию слайса.', () => {
    const store = configureStore({ reducer: { todos: todoSlice } });
    const state = store.getState();

    expect(state.todos).toEqual(initialState); // Исправлено (store.getState().todos)
  });

  test('Проверка состояния при запросе данных (pending).', () => {
    const actualState = todoSlice(initialState, fetchTodos.pending(''));

    expect(actualState.isLoading).toBe(true);
    expect(actualState.error).toBe(null);
  });

  test('Проверка состояния при успешном получении данных (fulfilled).', async () => {
    (getTodosApi as jest.Mock).mockResolvedValue(mockTodos);

    const actualState = todoSlice(initialState, fetchTodos.fulfilled(mockTodos, ''));

    expect(actualState.isLoading).toBe(false);
    expect(actualState.todos).toEqual(mockTodos);
    expect(actualState.error).toBe(null);
  });

  test('Проверка состояния при ошибке (rejected).', async () => {
    (getTodosApi as jest.Mock).mockRejectedValue(new Error(testError));

    const actualState = todoSlice(initialState, fetchTodos.rejected(new Error(testError), ''));

    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(testError);
  });
});
