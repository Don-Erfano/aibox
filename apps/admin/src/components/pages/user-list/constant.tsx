import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';
import { StatusBox } from '@aibox/ui';
import { AdminBadge } from '@/components/badges/admin-badge';
import { useRef } from 'react';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: 'نام کاربر',
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    maxSize: 100,
    cell: ({ row, getValue }) => {
      const url = row.original.profile_picture;
      const fullName = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          <Image
            src={url ? url : '/images/default-user.svg'}
            alt={fullName}
            width={28}
            height={28}
            className="object-cover border-1 border-teal-600 rounded-full"
          />
          <span>{fullName}</span>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: { label: 'Full Name', variant: 'text' },
  },
  {
    header: 'نام مستعار',
    accessorKey: 'nickname',
    id: 'nickname',
    enableColumnFilter: true,
    meta: { label: 'Nickname', variant: 'text' },
    maxSize: 100,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    enableColumnFilter: true,
    meta: { label: 'Email', variant: 'text' },
    maxSize: 140,
  },
  {
    header: 'تاریخ عضویت',
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    meta: { label: 'Created At', variant: 'date' },
  },
  {
    header: 'آخرین دسترسی',
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) =>
      getValue() ? new Date(getValue() as string).toLocaleString() : '—',
    meta: { label: 'Last Login', variant: 'date' },
  },
  {
    header: 'وضعیت',
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ getValue }) =>
      (getValue() as boolean) ? (
        <StatusBox isActive />
      ) : (
        <StatusBox isActive={false} />
      ),
    meta: { label: 'Is Active', variant: 'select' },
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
    meta: { label: 'Is Admin', variant: 'select' },
  },
];
export default userColumns;
