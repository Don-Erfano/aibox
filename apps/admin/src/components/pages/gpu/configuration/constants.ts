import { ColumnDef } from '@tanstack/react-table';

import { AibStatus } from '@aibox/ui';

import { strings } from '@/constant';
import { IConfiguration } from '@/services';
import { z } from 'zod';

export const ConfigurationCols: ColumnDef<IConfiguration>[] = [
  {
    id: 'GPU',
    header: 'GPU',
    accessorKey: 'gpu',
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    header: strings.motherboard,
    id: 'motherboard',
    accessorKey: 'motherboard',
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: false,
  },
  {
    id: 'hourly_price',
    header: strings.hourlyPrice,
    accessorFn: (row) => Number(row.hourly_price).toLocaleString(),
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    id: 'discount',
    header: strings.discount,
    accessorFn: (row) => `-`,
    enableColumnFilter: true,
    meta: {
      label: strings.provider,
      variant: 'text',
    },
    enableSorting: true,
  },
  {
    header: strings.status,
    accessorKey: 'is_active',
    id: 'is_active',
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return AibStatus({
        label: isActive ? 'فعال' : 'غیرفعال',
        bgColor: isActive
          ? 'bg-green-600 text-green-600'
          : 'bg-red-600 text-red-600',
      });
    },
    enableColumnFilter: true,
    meta: { label: strings.status, variant: 'select' },
    enableSorting: false,
  },
];

export const configurationSchema = z.object({
  gpu_id: z.string().nonempty(),
  motherboard_id: z.string().nonempty(),
  hourly_price: z.string().superRefine(
    (arg, ctx) =>
      Number(arg) <= 0 &&
      ctx.addIssue({
        code: 'invalid_string',
        validation: {
          endsWith: '',
          startsWith: '',
          includes: '',
        },
      })
  ),
  discount: z.string(),
  is_active: z.string(),
});

export const defaultValues = {
  gpu_id: '',
  motherboard_id: '',
  hourly_price: '',
  discount: '',
  is_active: 'active',
};
