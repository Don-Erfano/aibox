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
import { strings } from '@/constant';

const kindMap: Record<string, { label: string; icon: ReactNode }> = {
  withdraw: { label: strings.withdrawCharge, icon: <WithdrawIcon /> },
  deposit: { label: strings.depositCharge, icon: <DepositIcon /> },
};

const titleMap: Record<string, { label: string }> = {
  deposit: { label: strings.depositCharge },
  withdraw: { label: strings.withdrawCharge },
  api_buy: { label: strings.buyApi },
  api_sale: { label: strings.saleApi },
  compute: { label: strings.compute },
  wage: { label: strings.wage },
  package: { label: strings.package },
  gift_code: { label: strings.giftCode },
  factor: { label: strings.factor },
};

const statusMap: Record<string, { label: string; icon: ReactNode }> = {
  in_progress: { label: strings.inprogress, icon: <PendingIcon /> },
  fail: { label: strings.unsuccessful, icon: <FailedIcon /> },
  cancel: { label: strings.canceled, icon: <ErrorIcon /> },
  done: {
    label: strings.successful,
    icon: <SuccessIcon className="rotate-180" />,
  },
};

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    header: strings.transactionType,
    accessorKey: 'kind',
    id: 'kind',
    meta: { label: strings.transactionType, variant: 'select' },
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
    header: strings.title,
    accessorKey: 'title',
    id: 'title',
    meta: { label: strings.title, variant: 'select' },
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
    header: strings.date,
    accessorKey: 'date',
    id: 'date',
    meta: { label: strings.date, variant: 'date' },
    enableColumnFilter: true,
    maxSize: 160,
    cell: ({ getValue }) => formatJalali(getValue() as string),
  },
  {
    header: strings.TomanPrice,
    accessorKey: 'amount',
    id: 'amount',
    meta: { label: strings.price, variant: 'text' },
    enableColumnFilter: true,
    enableSorting: false,
    maxSize: 100,
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return Math.abs(amount).toLocaleString();
    },
  },
  {
    header: strings.status,
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
  { value: 'done', label: strings.successful },
  { value: 'fail', label: strings.unsuccessful },
  { value: 'in_progress', label: strings.inprogress },
  { value: 'cancel', label: strings.canceled },
];

export const kindToggleItems = [
  { value: 'withdraw', label: strings.withdraw },
  { value: 'deposit', label: strings.deposit },
];

export const titleToggleItems = Object.entries(titleMap).map(
  ([value, { label }]) => ({ value, label })
);

export default transactionColumns;
