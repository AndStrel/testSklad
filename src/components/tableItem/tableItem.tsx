import { TableItemUI } from '@ui/tableItemUI';
import { TUserTable } from 'types/user';

interface TableItemProps {
  user: TUserTable;
}

export const TableItem: React.FC<TableItemProps> = ({ user }) => {
  const { id, name, email, count } = user;
  return <TableItemUI id={id} name={name} email={email} count={count} />;
};
