import { HomePageUI } from '@ui/pages';
import { selectSortedUsers } from '@utils/slices/usersSlice';
import { useAppSelector } from '@utils/store';
import { TUserTable } from 'types/user';
export const HomePage: React.FC = () => {
  const usersWithTodoCount: TUserTable[] = useAppSelector(selectSortedUsers);

  return <HomePageUI usersWithTodoCount={usersWithTodoCount} />;
};
