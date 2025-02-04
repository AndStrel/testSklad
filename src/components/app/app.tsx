import { HomePage } from '@pages/homePage';
import { getTodosApi } from '@utils/api/todosApi';
import { fetchTodos } from '@utils/slices/todoSlice';
import { fetchUsers } from '@utils/slices/usersSlice';

import { useAppDispatch, useAppSelector } from '@utils/store';

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.todo);
  const { isLoading: usersLoading, error: usersError } = useAppSelector(
    (state) => state.users,
  );
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTodos());
  }, [dispatch]);

  if (isLoading || usersLoading) return <h1>Загрузка...</h1>;
  if (error || usersError) return <h1>Ошибка: {error || usersError}</h1>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
