import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { IGpuList } from './interface';

export const motherboardCols: ColumnDef<IGpuList>[] = [
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
    id: 'code_core',
    header: strings.cores,
    accessorFn: (row) => `${row.coda_core}`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
];
