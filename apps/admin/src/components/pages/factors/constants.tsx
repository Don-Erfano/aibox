import { AibStatus, AvatarIcon, Option } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';
import { z } from 'zod';

import { FactorStatus, FactorStatusType, IFactor } from '@/services/factor';
import { factorStrings } from './strings';

export const statusMap: Record<
  FactorStatusType,
  { label: string; badge: ReactNode }
> = {
  done: {
    label: factorStrings.done,
    badge: (
      <AibStatus
        label={factorStrings.done}
        bgColor="bg-green-600 text-zinc-700"
      />
    ),
  },

  expired: {
    label: factorStrings.expired,
    badge: (
      <AibStatus
        label={factorStrings.expired}
        bgColor="bg-gray-500 text-zinc-700"
      />
    ),
  },
  fail: {
    label: factorStrings.fail,
    badge: (
      <AibStatus
        label={factorStrings.fail}
        bgColor="bg-red-600 text-zinc-700"
      />
    ),
  },
  in_progress: {
    label: factorStrings.inPorgress,
    badge: (
      <AibStatus
        label={factorStrings.inPorgress}
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
  console.log(departments);
  return [
    {
      header: factorStrings.num,
      id: 'num',
      accessorKey: 'num',
    },
    {
      header: factorStrings.user,
      id: 'user',
      accessorKey: 'user',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: factorStrings.user,
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
      header: factorStrings.department,
      accessorKey: 'department',
      id: 'department',
      cell: ({ row }) => row.original.department?.title,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: factorStrings.department,
        options: departments,
      },
    },
    {
      header: factorStrings.createdDate,
      accessorKey: 'created_at',
      id: 'created_at',
      cell: ({ getValue }) =>
        getValue()
          ? new Date(getValue() as string).toLocaleString('fa-IR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-',
    },
    {
      header: factorStrings.dueDate,
      accessorKey: 'pay_date',
      id: 'pay_date',
      cell: ({ getValue }) =>
        getValue()
          ? new Date(getValue() as string).toLocaleString('fa-IR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '-',
    },
    {
      header: factorStrings.priceColumn,
      accessorKey: 'price',
      id: 'price',
      cell: ({ getValue }) => (getValue() as number).toLocaleString(),
    },
    {
      header: factorStrings.discountColumn,
      accessorKey: 'discount_percent',
      id: 'discount_percent',
    },
    {
      header: factorStrings.status,
      accessorKey: 'status',
      id: 'status',
      cell: ({ getValue }) => statusMap[getValue() as FactorStatusType].badge,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: factorStrings.status,
        options: factorStatusOptions,
      },
    },
  ];
};
