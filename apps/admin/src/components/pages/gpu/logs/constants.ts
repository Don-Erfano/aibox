import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { IGpuList } from './interface';

export const logsCol: ColumnDef<IGpuList>[] = [
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
    header: strings.packageName,
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
    id: 'brand',
    header: strings.activatedTime,
    accessorFn: (row) => `${row.brand}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'free_days',
    header: strings.usage,
    accessorFn: (row) => `${row.free_days}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'status',
    header: strings.packageStatus,
    accessorFn: (row) => `${row.brand}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
];
