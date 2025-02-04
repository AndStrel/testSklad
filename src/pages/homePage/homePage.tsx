import { HomePageUI } from '@ui/pages';
import { selectUsersWithTodoCount } from '@utils/slices/usersSlice';
import { useAppSelector } from '@utils/store';
export const HomePage: React.FC = () => {
  const usersWithTodoCount = useAppSelector(selectUsersWithTodoCount);

  return <HomePageUI usersWithTodoCount={usersWithTodoCount} />;
};
