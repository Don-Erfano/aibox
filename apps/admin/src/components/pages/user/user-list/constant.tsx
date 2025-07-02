'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';
import { AibStatus, formatJalali } from '@aibox/ui';
import { AdminBadge } from '@/components/badges/admin-badge';
import { USERS_BASE_ROUTE } from '@/routes/baseRoutes';
import { strings } from '@/constant';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: strings.userName,
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    enableSorting: false,
    maxSize: 140,
    cell: ({ row, getValue }) => {
      const picture = row.original.profile_picture;
      const fullName = getValue() as string;

      return (
        <Link
          href={`${USERS_BASE_ROUTE}/${row.original.id}`}
          className="flex items-center space-x-2 hover:underline"
        >
          <Image
            src={picture || '/images/default-user.svg'}
            alt={fullName}
            width={32}
            height={32}
            className="object-cover border-1 border-teal-600 rounded-full"
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-teal-600">
            {fullName}
          </span>
        </Link>
      );
    },
  },
  {
    header: strings.nickName,
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
    header: strings.registerationDate,
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => formatJalali(getValue() as string),
    enableColumnFilter: true,
    meta: { label: 'Created At', variant: 'date' },
    maxSize: 160,
  },
  {
    header: strings.lastLogin,
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) => {
      const raw = getValue() as string;
      return raw ? formatJalali(raw) : '—';
    },
    enableColumnFilter: true,
    meta: { label: strings.lastLogin, variant: 'date' },
    maxSize: 160,
  },

  {
    header: strings.status,
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return (
        <AibStatus
          label={isActive ? strings.active : strings.deactive}
          bgColor={isActive ? 'bg-green-600' : 'bg-red-600'}
        />
      );
    },
    enableColumnFilter: true,
    meta: { label: strings.status, variant: 'select' },
    maxSize: 160,
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
    enableSorting: false,
    enableColumnFilter: true,
    meta: { label: strings.access, variant: 'select' },
    maxSize: 160,
  },
  {
    header: strings.domain,
    accessorKey: 'domain',
    id: 'domain',
    maxSize: 150,
    enableSorting: false,
  },
];
export default userColumns;
