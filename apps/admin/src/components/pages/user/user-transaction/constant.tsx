'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  formatJalali,
  AibStatus,
  PendingIcon,
  FailedIcon,
  ErrorIcon,
  SuccessIcon,
  DepositIcon,
  WithdrawIcon,
} from '@aibox/ui';
import { Transaction } from '@/services/transactions/transaction/interface';
import { ReactNode } from 'react';

const StatusIconMap: Record<string, ReactNode> = {
  'در حال اقدام': <PendingIcon />,
  ناموفق: <FailedIcon />,
  'لغو شده': <ErrorIcon />,
  موفق: <SuccessIcon className="rotate-180" />,
};
const TransactionIconMap: Record<string, ReactNode> = {
  'برداشت اعتبار': <WithdrawIcon />,
  'افزایش اعتبار': <DepositIcon />,
};
const transactionColumns: ColumnDef<Transaction>[] = [
  {
    header: 'نوع تراکنش',
    accessorKey: 'kind',
    id: 'kind',
    cell: ({ getValue }) => {
      const label = getValue() as string;
      const icon = TransactionIconMap[label];

      return <AibStatus label={label} icon={icon} sizeClass="w-5 h-5" />;
    },
    maxSize: 120,
    meta: { label: 'نوع تراکنش', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    header: 'عنوان',
    accessorKey: 'title',
    id: 'title',
    maxSize: 120,
    meta: { label: 'عنوان', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    header: 'زمان',
    accessorKey: 'date',
    id: 'date',
    cell: ({ getValue }) => formatJalali(getValue() as string),
    maxSize: 160,
    meta: { label: 'زمان', variant: 'date' },
    enableColumnFilter: true,
  },
  {
    header: 'مبلغ (تومان)',
    accessorKey: 'amount',
    id: 'amount',
    maxSize: 100,
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return Math.abs(amount).toLocaleString();
    },
    enableColumnFilter: true,
    meta: { label: 'مبلغ', variant: 'text' },
  },
  {
    header: 'وضعیت',
    accessorKey: 'status',
    id: 'status',
    maxSize: 60,
    cell: ({ getValue, row }) => {
      console.log(row);
      const label = getValue() as string;
      const icon = StatusIconMap[label];

      return <AibStatus label={label} icon={icon} sizeClass="w-5 h-5" />;
    },
    meta: { label: 'وضعیت', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
  },
];

export const statusToggleItems = [
  { value: 'موفق', label: 'موفق' },
  { value: 'ناموفق', label: 'ناموفق' },
];

export const kindToggleItems = [
  { value: 'withdraw', label: 'برداشت' },
  { value: 'deposit', label: 'واریز' },
];

export default transactionColumns;
