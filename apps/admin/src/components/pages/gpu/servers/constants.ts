import { strings } from '@/constant';
import { AibStatus } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

export const seversCol: ColumnDef<any>[] = [
  {
    id: 'model',
    header: strings.userName,
    accessorFn: (row) => `${row.model}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.processor,
    id: 'ram',
    accessorFn: (row) => `${row.ram}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    id: 'code_core',
    header: strings.startTime,
    accessorFn: (row) => `${row.coda_core}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'finishReserve',
    header: strings.finishReserve,
    accessorFn: (row) => `${row.finishReserve}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'status',
    header: strings.status,
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
    enableSorting: true,
  },
];

export const errorsCol: ColumnDef<any>[] = [
  {
    id: 'model',
    header: strings.userName,
    accessorFn: (row) => `${row.finishReserve}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.processor,
    id: 'processor',
    accessorFn: (row) => `${row.model}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.createDate,
    id: 'createDate',
    accessorFn: (row) => `${row.ram}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    header: strings.errorMessage,
    id: 'errorMessage',
    accessorFn: (row) => `${row.error}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
    maxSize: 400,
  },
];
