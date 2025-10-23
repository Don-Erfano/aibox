import { ColumnDef } from '@tanstack/react-table';

import { AibStatus, ToggleItem } from '@aibox/ui';

import { strings } from '@/constant';
import {
  BasePackageStatus,
  IConfiguration,
  IGpu,
  IMotherboard,
} from '@/services/gpu';
import { z } from 'zod';

export const basePackageStatusMap: Record<BasePackageStatus, string> = {
  HOURLY: strings.hourly,
  MONTHLY: strings.monthly,
  ALL: strings.both,
};

export const basePackageOptions = Object.entries(basePackageStatusMap).map(
  ([value, label]) => ({
    label,
    value,
  })
);

export const activeStatusOptions: [ToggleItem, ToggleItem] = [
  { label: strings.active, value: 'active' },
  { label: strings.deactive, value: 'deactive' },
];

export const ConfigurationCols: ({
  motherboards,
  gpus,
}: {
  motherboards?: IMotherboard[];
  gpus?: IGpu[];
}) => ColumnDef<IConfiguration>[] = ({ gpus, motherboards }) => [
  {
    id: 'gpu_id',
    header: 'GPU',
    accessorKey: 'gpu',
    enableColumnFilter: true,
    meta: {
      label: 'GPU',
      variant: 'multiSelect',
      mobileVisible: true,
      options: gpus?.map((gpu) => ({
        value: gpu.id,
        label: gpu.name,
      })),
    },
    enableSorting: false,
  },
  {
    header: strings.motherboard,
    id: 'motherboard_id',
    accessorKey: 'motherboard',
    enableColumnFilter: true,
    meta: {
      label: strings.motherboard,
      variant: 'multiSelect',
      options: motherboards?.map((motherboard) => ({
        label: motherboard.name,
        value: motherboard.id,
      })),
    },
    cell: ({ row }) => {
      return (
        <div dir="ltr" className="!text-right">
          {row.original.motherboard}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'base_package_status',
    header: strings.packageType,
    enableColumnFilter: true,
    accessorFn: ({ base_package_status: status }) =>
      basePackageStatusMap[status],
    meta: {
      label: strings.packageType,
      variant: 'multiSelect',
      options: basePackageOptions,
    },
    enableSorting: false,
  },
  {
    id: 'hourly_price',
    header: strings.tomanHourlyPrice,
    accessorFn: (row) =>
      row.hourly_price ? Number(row.hourly_price).toLocaleString() : '—',
    enableColumnFilter: true,
    meta: {
      label: strings.hourlyPrice,
      variant: 'range',
      unit: strings.toman,
    },
  },
  {
    id: 'price_monthly',
    header: strings.tomanMonthlyPrice,
    accessorFn: (row) =>
      row.price_monthly ? Number(row.price_monthly).toLocaleString() : '—',
    enableColumnFilter: true,
    meta: {
      label: strings.monthlyPrice,
      variant: 'range',
      unit: strings.toman,
    },
  },
  {
    id: 'discount',
    header: strings.percentageHourlyDiscount,
    accessorFn: (row) => row.discount || '—',
    enableColumnFilter: true,
    meta: {
      label: strings.hourlyDiscount,
      variant: 'range',
      range: [0, 100],
      showSlider: true,
      unit: '%',
    },
  },
  {
    id: 'discount_monthly',
    header: strings.percentageMonthlyDiscount,
    accessorFn: (row) => row.discount_monthly || '—',
    enableColumnFilter: true,
    meta: {
      label: strings.monthlyDiscount,
      variant: 'range',
      range: [0, 100],
      showSlider: true,
      unit: '%',
    },
  },
  {
    header: strings.status,
    accessorKey: 'is_active',
    id: 'is_active',
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
      mobileVisible: true,
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
    },
    enableSorting: false,
  },
];

export const configurationSchema = z.object({
  gpu_id: z.string().nonempty(),
  motherboard_id: z.string().nonempty(),
  hourly_price: z.preprocess(
    (val) => (val === '' ? 0 : val),
    z.number().min(0, 'مبلغ واردشده نادرست است.').optional().default(0)
  ),
  price_monthly: z.preprocess(
    (val) => (val === '' ? 0 : val),
    z.number().min(0, 'مبلغ واردشده نادرست است.').optional().default(0)
  ),
  base_package_status: z.enum(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Object.keys(basePackageStatusMap) as (keyof typeof basePackageStatusMap)[],
    'انتخاب نوع بسته الزامی است.'
  ),
  discount: z.preprocess(
    (val) => (val === '' ? 0 : val),
    z
      .number()
      .min(0)
      .max(100, 'تخفیف ساعتی نمی‌تواند بیشتر از 100 باشد.')
      .optional()
      .default(0)
  ),
  discount_monthly: z.preprocess(
    (val) => (val === '' ? 0 : val),
    z
      .number()
      .min(0)
      .max(100, 'تخفیف ماهانه نمی‌تواند بیشتر از 100 باشد.')
      .optional()
      .default(0)
  ),

  is_active: z.string(),
});
export type TRequestData = z.infer<typeof configurationSchema>;
