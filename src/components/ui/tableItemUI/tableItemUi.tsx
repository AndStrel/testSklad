import style from './tableItem.module.scss';
import avatar from '@assets/avatar.svg';
interface TableItemUIProps {
  id: number;
  name: string;
  email: string;
  count: number;
}

export const TableItemUI: React.FC<TableItemUIProps> = ({
  id = 1,
  name = 'Sebastian',
  email = 'norm@mail.ru',
  count = 2,
}) => {
  return (
    <tr className={style.item}>
      <td className={(style.td, style.numberContainer)}>{id}</td>
      <td className={(style.td, style.userContainer)}>
        <div className={style.user}>
          <div className={style.user__avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={style.user__info}>
            <p className={style.user__info__name}>{name}</p>
            <p className={style.user__info__email}>{email}</p>
          </div>
        </div>
      </td>
      <td className={(style.td, style.countContainer)}>{count}</td>
    </tr>
  );
};
