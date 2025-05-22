import { IUserToken } from '@/services/user/user-token/interface';
import { ColumnDef } from '@tanstack/react-table';

const tokenColumns: ColumnDef<IUserToken>[] = [
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    meta: { label: 'Email', variant: 'text' },
  },
  {
    header: 'Access Token',
    accessorKey: 'access_token',
    id: 'access_token',
    meta: { label: 'Access Token', variant: 'select' },
  },
  {
    header: 'Refresh Token',
    accessorKey: 'refresh_token',
    id: 'refresh_token',
    meta: { label: 'Refresh Token', variant: 'select' },
  },
];

export default tokenColumns;
