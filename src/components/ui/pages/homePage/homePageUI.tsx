import style from './homePageUI.module.scss';
import avatar from '@assets/avatar.svg';

export const HomePageUI: React.FC = ({}) => {
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
              <th className={style.th}>#</th>
              <th className={style.th}>Username</th>
              <th className={style.th}>to-do count</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {/* <tr className={style.item}>
              <td className={style.td}>1</td>
              <td className={style.td}>
                <div className={style.user}>
                  <div className={style.user__avatar}>
                    <img src={avatar} alt="avatar" />
                  </div>
                  <div className={style.user__info}>
                    <p className={style.user__info__name}>Ethan Mitchell</p>
                    <p className={style.user__info__email}>
                      ethan.mitchell24@email.com
                    </p>
                  </div>
                </div>
              </td>
              <td className={(style.td, style.countContainer)}>1</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </main>
  );
};
