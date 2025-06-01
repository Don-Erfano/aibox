import { ColumnDef } from '@tanstack/react-table';
import { IApiDetails } from '@/services';
import clsx from 'clsx';
import ActionCell from './actions-cell';

const status: {
  [x: string]: {
    label: string;
    color: string;
  };
} = {
  WAITING: {
    label: 'در انتظار تایید',
    color: 'blue-500',
  },
  WAITING_DEPRECATE: {
    label: 'درحال منقضی شدن',
    color: 'fuchsia-700',
  },
  DEPRECATED: {
    label: 'منقضی شده',
    color: 'gray-500',
  },
  ACCEPTED: {
    label: 'تایید شده',
    color: 'green-600',
  },
  PROCESSING: {
    label: 'ناقص',
    color: 'orange-500',
  },
  NOT_ACCEPTED: {
    label: 'مردود',
    color: 'red-600',
  },
  PROXY_ERROR: {
    label: 'خطای سرویس',
    color: 'red-600',
  },
};

const userColumns: ColumnDef<IApiDetails>[] = [
  {
    header: 'نام API',
    id: 'name',
    accessorFn: (row) => `${row.api.name}`,
    cell: ({ row, getValue }) => {
      const apiName = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-neutral-200 border border-teal-600" />
          <span>{apiName}</span>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: { label: 'نام API', variant: 'text' },
  },
  {
    header: 'ارائه دهنده',
    accessorFn: (row) => `${row.api.user.nick_name}`,
    enableColumnFilter: true,
    meta: {
      label: 'ارائه دهنده',
      variant: 'text',
    },
  },
  {
    header: 'ورژن',
    id: 'version',
    accessorKey: 'version',
  },
  {
    header: 'تاریخ کسب تأییدیه',
    accessorKey: 'status_data',
    enableColumnFilter: true,
    meta: {
      label: 'تاریخ کسب تاییدیه',
      variant: 'dateRange',
    },
  },
  {
    header: 'تعداد کاربران',
    accessorFn: () => '-',
    enableColumnFilter: true,
    meta: {
      label: 'تعداد کاربران',
      variant: 'range',
    },
  },
  {
    header: 'مجموع فراخوانی‌ها',
    accessorKey: 'requests',
    enableColumnFilter: true,
    meta: {
      label: 'تعداد فراخوانی',
      variant: 'range',
    },
  },
  {
    header: 'وضعیت',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <div
            className={clsx(
              'w-4 h-4 rounded-full',
              `bg-${status[row.original.status].color}`
            )}
          />
          <p className="text-zinc-700">{status[row.original.status].label}</p>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'وضعیت',
      variant: 'select',
      placeholder: 'وضعیت',
      options: [
        {
          label: 'در انتظار تایید',
          value: 'WAITING',
        },
        {
          label: 'در حال منقضی شدن',
          value: 'WAITING_DEPRECATE',
        },
        {
          label: 'منقضی شده',
          value: 'DEPRECATED',
        },
        {
          label: 'تایید شده',
          value: 'ACCEPTED',
        },
        {
          label: 'ناقص',
          value: 'PROCESSING',
        },
      ],
    },
  },
  {
    header: 'عملیات',
    cell: ({ row }) => <ActionCell {...row} />,
  },
];
export default userColumns;
