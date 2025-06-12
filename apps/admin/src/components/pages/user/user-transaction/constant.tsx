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

const kindMap: Record<string, { label: string; icon: ReactNode }> = {
  withdraw: { label: 'برداشت اعتبار', icon: <WithdrawIcon /> },
  deposit: { label: 'افزایش اعتبار', icon: <DepositIcon /> },
};

const titleMap: Record<string, { label: string }> = {
  deposit: { label: 'افزایش اعتبار' },
  withdraw: { label: 'برداشت اعتبار' },
  api_buy: { label: 'خرید API' },
  api_sale: { label: 'فروش API' },
  compute: { label: 'محاسبه' },
  wage: { label: 'دستمزد' },
  package: { label: 'پکیج' },
  gift_code: { label: 'کد هدیه' },
  factor: { label: 'فاکتور' },
};

const statusMap: Record<string, { label: string; icon: ReactNode }> = {
  in_progress: { label: 'در حال اقدام', icon: <PendingIcon /> },
  fail: { label: 'ناموفق', icon: <FailedIcon /> },
  cancel: { label: 'لغو شده', icon: <ErrorIcon /> },
  done: { label: 'موفق', icon: <SuccessIcon className="rotate-180" /> },
};

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    header: 'نوع تراکنش',
    accessorKey: 'kind',
    id: 'kind',
    meta: { label: 'نوع تراکنش', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
    maxSize: 120,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, icon } = kindMap[key] || { label: key, icon: null };
      return <AibStatus label={label} icon={icon} sizeClass="w-5 h-5" />;
    },
  },
  {
    header: 'عنوان',
    accessorKey: 'title',
    id: 'title',
    meta: { label: 'عنوان', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
    maxSize: 120,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label } = titleMap[key] || { label: key };
      return <AibStatus label={label} />;
    },
  },
  {
    header: 'زمان',
    accessorKey: 'date',
    id: 'date',
    meta: { label: 'زمان', variant: 'date' },
    enableColumnFilter: true,
    maxSize: 160,
    cell: ({ getValue }) => formatJalali(getValue() as string),
  },
  {
    header: 'مبلغ (تومان)',
    accessorKey: 'amount',
    id: 'amount',
    meta: { label: 'مبلغ', variant: 'text' },
    enableColumnFilter: true,
    enableSorting: false,
    maxSize: 100,
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return Math.abs(amount).toLocaleString();
    },
  },
  {
    header: 'وضعیت',
    accessorKey: 'status',
    id: 'status',
    meta: { label: 'وضعیت', variant: 'select' },
    enableColumnFilter: true,
    enableSorting: false,
    maxSize: 60,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, icon } = statusMap[key] || { label: key, icon: null };
      return <AibStatus label={label} icon={icon} sizeClass="w-5 h-5" />;
    },
  },
];

export const statusToggleItems = [
  { value: 'done', label: 'موفق' },
  { value: 'fail', label: 'ناموفق' },
  { value: 'in_progress', label: 'در حال اقدام' },
  { value: 'cancel', label: 'لغو شده' },
];

export const kindToggleItems = [
  { value: 'withdraw', label: 'برداشت' },
  { value: 'deposit', label: 'واریز' },
];

export const titleToggleItems = Object.entries(titleMap).map(
  ([value, { label }]) => ({ value, label })
);

export default transactionColumns;
