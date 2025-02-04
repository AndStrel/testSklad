import { reqResApi } from './reqResApi';
import { TTodo } from 'types/todo';

export const getTodosApi = async (): Promise<TTodo[]> => {
  try {
    const response = await reqResApi.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке списка дел:', error);
    throw error;
  }
};
