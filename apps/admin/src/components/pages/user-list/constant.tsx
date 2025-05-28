import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';
import { AibStatus } from '@aibox/ui';
import { AdminBadge } from '@/components/badges/admin-badge';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: 'نام کاربر',
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    maxSize: 140,
    cell: ({ row, getValue }) => {
      const url = row.original.profile_picture;
      const fullName = getValue() as string;

      return (
        <div className="flex items-center space-x-2">
          <Image
            src={url ? url : '/images/default-user.svg'}
            alt={fullName}
            width={32}
            height={32}
            className="object-cover border-1 border-teal-600 rounded-full"
          />
          <span>{fullName}</span>
        </div>
      );
    },
  },
  {
    header: 'نام مستعار',
    accessorKey: 'nickname',
    id: 'nickname',
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
  },
  {
    header: 'تاریخ عضویت',
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    enableColumnFilter: true,
    meta: { label: 'Created At', variant: 'date' },
  },
  {
    header: 'آخرین دسترسی',
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) =>
      getValue() ? new Date(getValue() as string).toLocaleString() : '—',
    enableColumnFilter: true,
    meta: { label: 'تاریخ عضویت', variant: 'date' },
  },
  {
    header: 'وضعیت',
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
    meta: { label: 'وضعیت', variant: 'select' },
  },
  {
    header: 'دسترسی',
    accessorKey: 'is_admin',
    id: 'is_admin',
    cell: ({ getValue }) =>
      (getValue() as boolean) ? (
        <AdminBadge isAdmin />
      ) : (
        <AdminBadge isAdmin={false} />
      ),
    enableColumnFilter: true,
    meta: { label: 'دسترسی', variant: 'select' },
  },
];
export default userColumns;
