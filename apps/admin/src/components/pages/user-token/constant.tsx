import { ColumnDef } from '@tanstack/react-table';

import { IUserToken } from '@/services/user/user-token/interface';
import { strings } from '@/constant';

const tokenColumns: ColumnDef<IUserToken>[] = [
  {
    header: strings.user,
    accessorKey: 'email',
    id: 'email',
    meta: { label: 'Email', variant: 'text' },
    maxSize: 160,
    enableSorting: false,
  },
  {
    header: 'Access Token',
    accessorKey: 'access_token',
    id: 'access_token',
    meta: { label: 'Access Token', variant: 'select' },
    maxSize: 160,
    enableSorting: false,
  },
  {
    header: 'Refresh Token',
    accessorKey: 'refresh_token',
    id: 'refresh_token',
    meta: { label: 'Refresh Token', variant: 'select' },
    maxSize: 160,
    enableSorting: false,
  },
];

export default tokenColumns;
