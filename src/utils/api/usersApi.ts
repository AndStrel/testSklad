import { reqResApi } from './reqResApi';
import { TUser } from 'types/user';

export const getUsers = async (): Promise<TUser[]> => {
  try {
    const response = await reqResApi.get('/users');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    throw error;
  }
};
