import { TableItemUI } from '@ui/tableItemUI';

interface TableItemProps {
  id: number;
  name: string;
  email: string;
  count: number;
}

export const TableItem: React.FC<TableItemProps> = ({
  id = 1,
  name = 'Sebastian',
  email = 'norm@mail.ru',
  count = 2,
}) => {
  return <TableItemUI id={id} name={name} email={email} count={count} />;
};
