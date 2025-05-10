import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-token/interface';

const tokenColumns: ColumnDef<IUser>[] = [
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    meta: { label: 'Email' },
  },
  {
    header: 'Access Token',
    accessorKey: 'access_token',
    id: 'access_token',
    meta: { label: 'Access Token' },
  },
  {
    header: 'Refresh Token',
    accessorKey: 'refresh_token',
    id: 'refresh_token',
    meta: { label: 'Refresh Token' },
  },
];

export default tokenColumns;
