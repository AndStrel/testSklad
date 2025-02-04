import { TableItem } from '@components/tableItem/tableItem';
import style from './homePageUI.module.scss';

interface HomePageUIProps {
  usersWithTodoCount: {
    id: number;
    name: string;
    email: string;
    count: number;
  }[];
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
            <TableItem />
            {/* {usersWithTodoCount.map((user) => (
              <TableItem
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                count={user.count}
              />
            ))} */}
          </tbody>
        </table>
      </div>
    </main>
  );
};
