import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';

import { strings } from '@/constant';
import ActionCell from './actions-cell';
import { IApiDetails } from '@/services';

const status: {
  [x: string]: {
    label: string;
    color: string;
  };
} = {
  WAITING: {
    label: strings.waitingForAccept,
    color: 'blue-500',
  },
  WAITING_DEPRECATE: {
    label: strings.deprecating,
    color: 'fuchsia-700',
  },
  DEPRECATED: {
    label: strings.deprecated,
    color: 'gray-500',
  },
  ACCEPTED: {
    label: strings.approved,
    color: 'green-600',
  },
  PROCESSING: {
    label: strings.incomplete,
    color: 'orange-500',
  },
  NOT_ACCEPTED: {
    label: strings.rejected,
    color: 'red-600',
  },
  PROXY_ERROR: {
    label: strings.serviceError,
    color: 'red-600',
  },
};

const userColumns: ColumnDef<IApiDetails>[] = [
  {
    header: strings.apiName,
    id: 'name',
    accessorFn: (row) => `${row.api.name}`,
    cell: ({ getValue }) => {
      const apiName = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-neutral-200 border border-teal-600" />
          <span>{apiName}</span>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: { label: strings.apiName, variant: 'text' },
  },
  {
    header: strings.provider,
    accessorFn: (row) => `${row.api.user.nick_name}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
  },
  {
    header: strings.version,
    id: 'version',
    accessorKey: 'version',
  },
  {
    header: strings.approvedDate,
    accessorKey: 'status_data',
    enableColumnFilter: true,
    meta: {
      label: strings.approvedDate,
      variant: 'dateRange',
    },
  },
  {
    header: strings.usersCount,
    accessorFn: () => '-',
    enableColumnFilter: true,
    meta: {
      label: strings.usersCount,
      variant: 'range',
    },
  },
  {
    header: strings.totalRequestsCount,
    accessorKey: 'requests',
    enableColumnFilter: true,
    meta: {
      label: strings.requestsCount,
      variant: 'range',
    },
  },
  {
    header: strings.status,
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
      label: strings.status,
      variant: 'select',
      placeholder: strings.status,
      options: [
        {
          label: strings.waitingForAccept,
          value: 'WAITING',
        },
        {
          label: strings.deprecating,
          value: 'WAITING_DEPRECATE',
        },
        {
          label: strings.deprecated,
          value: 'DEPRECATED',
        },
        {
          label: strings.approved,
          value: 'ACCEPTED',
        },
        {
          label: strings.incomplete,
          value: 'PROCESSING',
        },
      ],
    },
  },
  {
    header: strings.tableActions,
    cell: ({ row }) => <ActionCell {...row} />,
  },
];
export default userColumns;
