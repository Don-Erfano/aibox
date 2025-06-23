import { AibStatus, AvatarIcon, Option, formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';
import { z } from 'zod';

import { strings } from '@/constant';
import { FactorStatus, FactorStatusType, IFactor } from '@/services/factor';

export const statusMap: Record<
  FactorStatusType,
  { label: string; badge: ReactNode }
> = {
  done: {
    label: strings.done,
    badge: (
      <AibStatus label={strings.done} bgColor="bg-green-600 text-zinc-700" />
    ),
  },

  expired: {
    label: strings.expired,
    badge: (
      <AibStatus label={strings.expired} bgColor="bg-gray-500 text-zinc-700" />
    ),
  },
  fail: {
    label: strings.fail,
    badge: (
      <AibStatus label={strings.fail} bgColor="bg-red-600 text-zinc-700" />
    ),
  },
  in_progress: {
    label: strings.inPorgress,
    badge: (
      <AibStatus
        label={strings.inPorgress}
        bgColor="bg-orange-500 text-zinc-700"
      />
    ),
  },
};

export const factorStatusOptions: {
  label: string;
  value: FactorStatusType;
}[] = [
  {
    label: statusMap[FactorStatus.DONE].label,
    value: FactorStatus.DONE,
  },
  {
    label: statusMap[FactorStatus.EXPIRED].label,
    value: FactorStatus.EXPIRED,
  },
  {
    label: statusMap[FactorStatus.FAIL].label,
    value: FactorStatus.FAIL,
  },
  {
    label: statusMap[FactorStatus.IN_PROGRESS].label,
    value: FactorStatus.IN_PROGRESS,
  },
];

export const addFactorSchema = z.object({
  user: z.string().min(1, 'انتخاب گزینه الزامی است.'),
  price: z
    .number({ message: 'وارد کردن این فیلد الزامی است.' })
    .max(999999999, 'مقدار این فیلد بیش از حد مجاز است.'),
  due_date: z.string().optional(),
  created_at: z.string().optional(),
  status: z.string().optional(),
  department: z.string().optional(),
  description: z
    .string()
    .max(200, 'طول کاراکتر بیش از حد مجاز است.')
    .optional(),
  discount_percent: z
    .number()
    .min(0, 'مقدار وارد شده کمتر از حد مجاز است.')
    .max(100, 'مقدار وارد شده بیش از حد مجاز است.')
    .optional(),
});

export const getFacotrColumns = (
  users?: Option[],
  departments?: Option[]
): ColumnDef<IFactor>[] => {
  return [
    {
      header: strings.num,
      id: 'num',
      accessorKey: 'num',
    },
    {
      header: strings.user,
      id: 'user',
      accessorKey: 'user',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: strings.user,
        options: users,
      },
      cell: ({ row }) => {
        const { email, prfoile_picture } = row.original.user;
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 flex justify-center items-center border border-teal-600 rounded-full">
              {prfoile_picture ? (
                <Image
                  src={prfoile_picture}
                  style={{ borderRadius: '100%' }}
                  alt={email}
                  width={32}
                  height={32}
                />
              ) : (
                <AvatarIcon />
              )}
            </div>
            <p>{email}</p>
          </div>
        );
      },
    },
    {
      header: strings.department,
      accessorKey: 'department',
      id: 'department',
      cell: ({ row }) => row.original.department?.title,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: strings.department,
        options: departments,
      },
    },
    {
      header: strings.createdDate,
      accessorKey: 'created_at',
      id: 'created_at',
      cell: ({ getValue }) =>
        getValue() ? formatJalali(getValue() as string) : '—',
    },
    {
      header: strings.dueDate,
      accessorKey: 'pay_date',
      id: 'pay_date',
      cell: ({ getValue }) =>
        getValue() ? formatJalali(getValue() as string) : '—',
    },
    {
      header: strings.priceColumn,
      accessorKey: 'price',
      id: 'price',
      cell: ({ getValue }) => (getValue() as number).toLocaleString(),
    },
    {
      header: strings.discountColumn,
      accessorKey: 'discount_percent',
      id: 'discount_percent',
    },
    {
      header: strings.status,
      accessorKey: 'status',
      id: 'status',
      cell: ({ getValue }) => statusMap[getValue() as FactorStatusType].badge,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: strings.status,
        options: factorStatusOptions,
      },
    },
  ];
};
