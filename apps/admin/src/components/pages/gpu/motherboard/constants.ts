import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { IMotherboard } from '@/services/gpu';
import z from 'zod';

export const motherboardCols: ColumnDef<IMotherboard>[] = [
  {
    id: 'model',
    header: strings.model,
    accessorFn: (row) => `${row.cpu_model}`,
    enableColumnFilter: true,
    meta: {
      label: strings.model,
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    header: strings.ram,
    id: 'ram',
    accessorFn: (row) => `${row.ram}`,
    enableColumnFilter: true,
    meta: {
      label: strings.ram,
      variant: 'range',
      range: [1, 512],
      mobileVisible: true,
    },
    enableSorting: true,
  },
  {
    id: 'cpu_cores',
    header: strings.cores,
    accessorFn: (row) => `${row.cpu_cores}`,
    enableColumnFilter: true,
    meta: {
      label: strings.cores,
      variant: 'range',
      range: [1, 1000],
    },
    enableSorting: true,
  },
];

export const formSchema = z.object({
  ram: z.number(),
  cpu_model: z.string(),
  cpu_cores: z.number(),
});
