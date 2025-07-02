import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { IGpuList } from './interface';

export const GpuCols: ColumnDef<IGpuList>[] = [
  {
    id: 'model',
    header: strings.model,
    accessorFn: (row) => `${row.model}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.ram,
    id: 'ram',
    accessorFn: (row) => `${row.ram}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'brand',
    header: strings.brand,
    accessorFn: (row) => `${row.brand}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    id: 'code_core',
    header: strings.codaCore,
    accessorFn: (row) => `${row.coda_core}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'reliablity',
    header: 'Reliability',
    accessorFn: (row) => `${row.reliablity}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'free_hours',
    header: strings.freeHours,
    accessorFn: (row) => `${row.free_hours}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'free_days',
    header: strings.freeDays,
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
    header: strings.status,
    accessorFn: (row) => `${row.brand}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
];
