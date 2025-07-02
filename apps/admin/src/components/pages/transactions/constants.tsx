import {
  AibStatus,
  DepositIcon,
  ErrorIcon,
  FailedIcon,
  formatJalali,
  Option,
  PendingIcon,
  SuccessIcon,
  ToggleSwitchItems,
  WithdrawIcon,
} from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { z } from 'zod';

import { strings } from '@/constant';

import { Transaction } from './interface';

const kindMap: Record<string, { label: string; icon: ReactNode }> = {
  withdraw: {
    label: strings.creditWithdraw,
    icon: <WithdrawIcon />,
  },
  deposit: {
    label: strings.creditDeposit,
    icon: <DepositIcon />,
  },
};

const titleMap: Record<string, { label: string }> = {
  deposit: { label: strings.creditDeposit },
  withdraw: { label: strings.creditWithdraw },
  api_buy: { label: strings.buyAPI },
  api_sale: { label: strings.saleAPI },
  compute: { label: strings.compute },
  wage: { label: strings.wage },
  package: { label: strings.package },
  gift_code: { label: strings.giftCode },
  factor: { label: strings.factor },
};

const statusMap: Record<string, { label: string; icon: ReactNode }> = {
  in_progress: {
    label: strings.inAwaitAction,
    icon: <PendingIcon />,
  },
  fail: {
    label: strings.failed,
    icon: <FailedIcon />,
  },
  cancel: {
    label: strings.canceled,
    icon: <ErrorIcon />,
  },
  done: {
    label: strings.successful,
    icon: <SuccessIcon className="rotate-180" />,
  },
};

export const statusOptions = [
  { value: 'done', label: strings.successful },
  { value: 'fail', label: strings.failed },
  { value: 'in_progress', label: strings.inAwaitAction },
  { value: 'cancel', label: strings.canceled },
];

export const statusToggleItems: ToggleSwitchItems = [
  { value: 'done', label: strings.successful },
  { value: 'fail', label: strings.failed },
];

export const kindOptions = [
  { value: 'withdraw', label: strings.withdraw },
  { value: 'deposit', label: strings.deposit },
];

export const titleOptions = Object.entries(titleMap).map(
  ([value, { label }]) => ({ value, label })
);

export const getTransactionColumns = ({
  userOptions,
}: {
  userOptions?: Option[];
}): ColumnDef<Transaction>[] => [
  {
    header: strings.userName,
    accessorKey: 'user',
    id: 'user',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      variant: 'select',
      label: strings.userName,
      options: userOptions,
    },
    cell: ({ row }) => row.original.user.email,
  },
  {
    header: strings.transactionType,
    accessorKey: 'kind',
    id: 'kind',
    meta: {
      label: strings.transactionType,
      variant: 'select',
      options: kindOptions,
    },
    enableColumnFilter: true,
    enableSorting: false,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, icon } = kindMap[key] || { label: key, icon: null };
      return <AibStatus label={label} icon={icon} sizeClass="size-5" />;
    },
  },
  {
    header: strings.title,
    accessorKey: 'title',
    id: 'title',
    meta: {
      label: strings.title,
      variant: 'select',
      options: titleOptions,
    },
    enableColumnFilter: true,
    enableSorting: false,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label } = titleMap[key] || { label: key };
      return label;
    },
  },
  {
    header: strings.time,
    accessorKey: 'date',
    id: 'date',
    cell: ({ getValue }) => formatJalali(getValue() as string),
  },
  {
    header: strings.tomanAmount,
    accessorKey: 'amount',
    enableSorting: true,
    id: 'amount',
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return Math.abs(amount).toLocaleString();
    },
  },
  {
    header: strings.status,
    accessorKey: 'status',
    id: 'status',
    meta: {
      label: strings.status,
      variant: 'select',
      options: statusOptions,
    },
    enableColumnFilter: true,
    enableSorting: false,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, icon } = statusMap[key] || { label: key, icon: null };
      return <AibStatus label={label} icon={icon} sizeClass="size-5" />;
    },
  },
];

export const transactionModalFormSchema = z.object({
  status: z.string(),
  track_id: z.string().max(30),
  description: z.string().max(200).optional(),
});
