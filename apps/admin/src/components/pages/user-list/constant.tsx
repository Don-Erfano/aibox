import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';
import { AibStatus } from '@aibox/ui';
import { AdminBadge } from '@/components/badges/admin-badge';
import { strings } from '@/constant';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: strings.userName,
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    cell: ({ row, getValue }) => {
      const url = row.original.profile_picture;
      const fullName = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          {url ? (
            <img
              src={url}
              alt={fullName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-neutral-200 border border-teal-600" />
          )}
          <span>{fullName}</span>
        </div>
      );
    },
  },
  {
    header: strings.nickName,
    accessorKey: 'nickname',
    id: 'nickname',
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
  },
  {
    header: strings.registerationDate,
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    enableColumnFilter: true,
    meta: { label: 'Created At', variant: 'date' },
  },
  {
    header: strings.lastLogin,
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) =>
      getValue() ? new Date(getValue() as string).toLocaleString() : '—',
    enableColumnFilter: true,
    meta: { label: strings.lastLogin, variant: 'date' },
  },
  {
    header: strings.status,
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return (
        <AibStatus
          label={isActive ? 'فعال' : 'غیرفعال'}
          bgColor={
            isActive ? 'bg-green-600 text-green-600' : 'bg-red-600 text-red-600'
          }
        />
      );
    },
    enableColumnFilter: true,
    meta: { label: strings.status, variant: 'select' },
  },
  {
    header: strings.access,
    accessorKey: 'is_admin',
    id: 'is_admin',
    cell: ({ getValue }) =>
      (getValue() as boolean) ? (
        <AdminBadge isAdmin />
      ) : (
        <AdminBadge isAdmin={false} />
      ),
    enableColumnFilter: true,
    meta: { label: strings.access, variant: 'select' },
  },
];
export default userColumns;
