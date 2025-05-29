import { AibStatus, AvatarIcon, Option } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode } from 'react';
import { z } from 'zod';

import { FactorStatus, FactorStatusType, IFactor } from '@/services/factor';

export const statusMap: Record<
  FactorStatusType,
  { label: string; badge: ReactNode }
> = {
  done: {
    label: 'پرداخت شده',
    badge: (
      <AibStatus label="پرداخت شده" bgColor="bg-green-600 text-zinc-700" />
    ),
  },

  expired: {
    label: 'منقضی',
    badge: <AibStatus label="منقضی" bgColor="bg-gray-500 text-zinc-700" />,
  },
  fail: {
    label: 'پرداخت ناموفق',
    badge: (
      <AibStatus label="پرداخت ناموفق" bgColor="bg-red-600 text-zinc-700" />
    ),
  },
  in_progress: {
    label: 'در انتظار پرداخت',
    badge: (
      <AibStatus
        label="در انتظار پرداخت"
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
      header: 'شماره',
      id: 'num',
      accessorKey: 'num',
    },
    {
      header: 'کاربر',
      id: 'user',
      accessorKey: 'user',
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: 'کاربر',
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
      header: 'دپارتمان',
      accessorKey: 'department',
      id: 'department',
      cell: ({ row }) => row.original.department?.title,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: 'دپارتمان',
        options: departments,
      },
    },
    {
      header: 'تاریخ ایجاد',
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
      header: 'تاریخ پرداخت',
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
      header: 'مبلغ(تومان)',
      accessorKey: 'price',
      id: 'price',
      cell: ({ getValue }) => (getValue() as number).toLocaleString(),
    },
    {
      header: 'تخفیف(٪)',
      accessorKey: 'discount_percent',
      id: 'discount_percent',
    },
    {
      header: 'وضعیت',
      accessorKey: 'status',
      id: 'status',
      cell: ({ getValue }) => statusMap[getValue() as FactorStatusType].badge,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        label: 'وضعیت',
        options: factorStatusOptions,
      },
    },
  ];
};
