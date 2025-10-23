import { ColumnDef } from '@tanstack/react-table';

import { AibStatus } from '@aibox/ui';

import { IGpu } from '@/services/gpu';
import { strings } from '@/constant';
import { z } from 'zod';

const GpuCols: ColumnDef<IGpu>[] = [
  {
    id: 'model',
    header: strings.model,
    accessorFn: (row) => `${row.model}`,
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
    },
    enableSorting: true,
  },
  {
    id: 'brand',
    header: strings.brand,
    accessorFn: (row) => `${row.brand}`,
    enableColumnFilter: true,
    meta: {
      label: strings.brand,
    },
    enableSorting: false,
  },
  {
    id: 'cuda_cores',
    header: strings.codaCore,
    accessorFn: (row) => `${row.cuda_cores}`,
    enableColumnFilter: true,
    meta: {
      label: strings.codaCore,
      variant: 'range',
    },
    enableSorting: true,
  },
  {
    id: 'reliability',
    header: 'Reliability',
    accessorFn: (row) => `${row.reliability}`,
    enableColumnFilter: true,
    meta: {
      label: 'Reliability',
      variant: 'range',
      range: [0, 100],
    },
    enableSorting: true,
  },
  {
    id: 'free_hour',
    header: strings.freeHours,
    accessorFn: (row) => `${row.free_hour}`,
    enableColumnFilter: true,
    meta: {
      label: strings.freeHours,
      variant: 'range',
    },
    enableSorting: true,
  },
  {
    id: 'free_days',
    header: strings.freeDays,
    accessorFn: (row) => `${row.free_days}`,
    enableColumnFilter: true,
    meta: {
      label: strings.freeDays,
      variant: 'range',
    },
    enableSorting: true,
  },
  {
    id: 'is_active',
    accessorKey: 'is_active',
    header: strings.status,
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return AibStatus({
        label: isActive ? strings.active : strings.deactive,
        bgColor: isActive
          ? 'bg-green-600 text-green-600'
          : 'bg-red-600 text-red-600',
      });
    },
    enableColumnFilter: true,
    meta: {
      label: strings.status,
      variant: 'select',
      options: [
        {
          label: strings.active,
          value: 'true',
        },
        {
          label: strings.deactive,
          value: 'false',
        },
      ],
      mobileVisible: true,
    },
    enableSorting: false,
  },
];

const gpuScheme = z.object({
  ram: z.number(),
  model: z.string().nonempty(),
  brand: z.string().nonempty(),
  free_days: z.number().default(0).optional(),
  free_hour: z.number().default(0).optional(),
  cuda_cores: z.number(),
  reliability: z.number().max(100, 'مقدار وارد شده حداکثر می‌تواند ۱۰۰ باشد.'),
  is_active: z.string().nonempty(),
});

type gpuFormType = z.infer<typeof gpuScheme>;

export type { gpuFormType };
export { GpuCols, gpuScheme };
