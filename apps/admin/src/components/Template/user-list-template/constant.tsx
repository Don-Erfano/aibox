import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/services/user/user-lists/interface';

const userColumns: ColumnDef<IUser>[] = [
  {
    header: 'نام کاربر',
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
    meta: { label: 'Full Name' },
  },
  {
    header: 'نام مستعار',
    accessorKey: 'nickname',
    id: 'nickname',
    meta: { label: 'Nickname' },
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    meta: { label: 'Email' },
  },
  {
    header: 'تاریخ عضویت',
    accessorKey: 'created_at',
    id: 'created_at',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    meta: { label: 'Created At' },
  },
  {
    header: 'آخرین دسترسی',
    accessorKey: 'last_login',
    id: 'last_login',
    cell: ({ getValue }) =>
      getValue() ? new Date(getValue() as string).toLocaleString() : '—',
    meta: { label: 'Last Login' },
  },
  {
    header: 'وضعیت',
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ getValue }) => ((getValue() as boolean) ? '✅فعال' : '❌غیر فعال'),
    meta: { label: 'Is Active' },
  },
  {
    header: 'دسترسی',
    accessorKey: 'is_admin',
    id: 'is_admin',
    cell: ({ getValue }) => ((getValue() as boolean) ? '✅ادمین' : 'کاربر'),
    meta: { label: 'Is Admin' },
  },
];
export default userColumns;
