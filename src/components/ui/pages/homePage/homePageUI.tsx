import { TableItem } from '@components/tableItem';
import style from './homePageUI.module.scss';
import { TUserTable } from 'types/user';

interface HomePageUIProps {
  usersWithTodoCount: TUserTable[];
}

export const HomePageUI: React.FC<HomePageUIProps> = ({
  usersWithTodoCount,
}) => {
  return (
    <main className={style.main}>
      <div className={style.containerTitle}>
        <h1 className={style.title}>User To-Do Table</h1>
        <p className={style.description}>
          User task table for effective planning.
        </p>
      </div>
      <div className={style.containerTable}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>
              <th className={(style.th, style.numberContainer)}>#</th>
              <th className={(style.th, style.userContainer)}>Username</th>
              <th className={(style.th, style.countContainer)}>to-do count</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {usersWithTodoCount.map((user) => (
              <TableItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
