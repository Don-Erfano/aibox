import Link from 'next/link';
import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { GPU_ROUTES } from '@/routes';
import { AibStatus } from '@aibox/ui';

export const resourceCol: ColumnDef<any>[] = [
  {
    id: 'model',
    header: strings.modelName,
    cell: ({ getValue, row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link
            href={`${GPU_ROUTES.RESOURCE}/1/2`}
            className="text-teal-600 text-sm font-normal underline"
          >
            {row.original.modelName}
          </Link>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.totalCount,
    id: 'processor',
    accessorFn: (row) => `${row.totalCount}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.freeCount,
    id: 'createDate',
    accessorFn: (row) => `${row.freeCount}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    header: strings.modelInfo,
    id: 'errorMessage',
    accessorFn: (row) => `${row.modelInfo}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
    maxSize: 400,
  },
];

export const modelCol: ColumnDef<any>[] = [
  {
    id: 'nodeName',
    header: strings.nodeName,
    accessorFn: (row) => `${row.nodeName}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.podName,
    id: 'processor',
    accessorFn: (row) => `${row.podName}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.status,
    id: 'errorMessage',
    cell: ({ row }) =>
      AibStatus({
        label: row.original.status,
        bgColor: 'bg-green-600',
      }),
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
    maxSize: 400,
  },
];
