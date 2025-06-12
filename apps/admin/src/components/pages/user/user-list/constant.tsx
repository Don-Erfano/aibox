'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';
import { AibStatus, formatJalali } from '@aibox/ui';
import { AdminBadge } from '@/components/badges/admin-badge';
import { USERS_ROUTES } from '@/routes';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: 'نام کاربر',
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    enableSorting: false,
    maxSize: 140,
    cell: ({ row, getValue }) => {
      const picture = row.original.profile_picture;
      const fullName = getValue() as string;
      const userId = row.original.id;

      return (
        <Link
          href={`/dashboard/user-transaction/${userId}`}
          className="flex items-center space-x-2 hover:underline"
        >
          <Image
            src={picture || '/images/default-user.svg'}
            alt={fullName}
            width={32}
            height={32}
            className="object-cover border-1 border-teal-600 rounded-full"
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {fullName}
          </span>
        </Link>
      );
    },
  },
  {
    header: 'نام مستعار',
    accessorKey: 'nickname',
    id: 'nickname',
    maxSize: 160,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    maxSize: 160,
  },
  {
    header: 'تاریخ عضویت',
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => formatJalali(getValue() as string),
    enableColumnFilter: true,
    meta: { label: 'Created At', variant: 'date' },
    maxSize: 160,
  },
  {
    header: 'آخرین دسترسی',
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) => {
      const raw = getValue() as string;
      return raw ? formatJalali(raw) : '—';
    },
    enableColumnFilter: true,
    meta: { label: 'آخرین دسترسی', variant: 'date' },
    maxSize: 160,
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
          bgColor={isActive ? 'bg-green-600' : 'bg-red-600'}
        />
      );
    },
    enableColumnFilter: true,
    meta: { label: 'وضعیت', variant: 'select' },
    maxSize: 160,
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
    enableSorting: false,
    enableColumnFilter: true,
    meta: { label: 'دسترسی', variant: 'select' },
    maxSize: 160,
  },
  {
    header: 'سامانه',
    accessorKey: 'domain',
    id: 'domain',
    maxSize: 150,
    enableSorting: false,
  },
];
export default userColumns;
