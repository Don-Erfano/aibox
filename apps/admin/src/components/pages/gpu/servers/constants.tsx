import { ColumnDef } from '@tanstack/react-table';

import { strings } from '@/constant';
import { AibStatus, formatJalali, Terminal } from '@aibox/ui';
import { IUser } from '@/services';
import { useState } from 'react';

const serverStatus: Record<string, Record<string, string>> = {
  running: { label: 'درحال استفاده', color: 'bg-green-600' },
  starting: { label: 'در انتظار شروع', color: 'bg-blue-500' },
  admin_cancel: { label: 'خاموش شده توسط ادمین', color: 'bg-zinc-600' },
  admin_stopped: { label: 'متوقف شده توسط ادمین', color: 'bg-red-300' },
  expired: { label: 'اتمام  رزرو', color: 'bg-gray-400' },
  system_error: { label: 'خطای فنی', color: 'bg-red-600' },
  assign_volume: { label: 'اختصاص حافظه', color: 'bg-zinc-600' },
  cancel: { label: 'لغو شده', color: 'bg-red-300' },
  stopped: { label: 'متوقف شده', color: 'bg-zinc-700' },
  in_queue: { label: 'در صف', color: 'bg-orange-500' },
  ready: { label: 'درحال آماده سازی', color: 'bg-teal-600' },
};

export const seversCol: ({
  profiles,
}: {
  profiles?: string[];
}) => ColumnDef<any>[] = ({ profiles }) => [
  {
    id: 'email',
    header: strings.userName,
    accessorFn: (row) => `${row.email}`,
    meta: {
      label: strings.userName,
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    id: 'profile',
    header: strings.processor,
    accessorKey: 'profile',
    enableColumnFilter: true,
    meta: {
      label: strings.processor,
      variant: 'multiSelect',
      options: profiles?.map((p) => ({
        label: p,
        value: p,
      })),
    },
    enableSorting: false,
  },
  {
    id: 'start_server_time',
    header: strings.startTime,
    accessorFn: (row) =>
      `${row.start_server_time ? formatJalali(row.start_server_time) : '-'}`,
    enableColumnFilter: true,
    meta: {
      label: strings.startTime,
      variant: 'dateRange',
    },
    enableSorting: true,
  },
  {
    id: 'reservation_end_time',
    header: strings.finishReserve,
    accessorFn: (row) =>
      `${
        row.reservation_end_time ? formatJalali(row.reservation_end_time) : '-'
      }`,
    enableColumnFilter: true,
    meta: {
      label: strings.finishReserve,
      variant: 'dateRange',
    },
    enableSorting: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: strings.status,
    cell: ({ row }) =>
      AibStatus({
        label: serverStatus[row.original.status].label,
        bgColor: serverStatus[row.original.status].color,
      }),
    enableColumnFilter: true,
    meta: {
      label: strings.status,
      variant: 'multiSelect',
      options: Object.keys(serverStatus).map((k) => ({
        label: serverStatus[k].label,
        value: k,
      })),
      mobileVisible: true,
    },
    enableSorting: false,
  },
];

export const errorsCol: ({
  profiles,
  users,
}: {
  profiles?: string[];
  users?: Pick<IUser, 'email' | 'id' | 'phone_number'>[];
}) => ColumnDef<any>[] = ({ profiles, users }) => [
  {
    id: 'userName',
    header: strings.userName,
    accessorFn: (row) => `${row.email}`,
    meta: {
      label: strings.userName,
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    header: strings.processor,
    id: 'processor',
    accessorFn: (row) => `${row.profile}`,
    enableColumnFilter: true,
    meta: {
      label: strings.processor,
      variant: 'select',
      options: profiles?.map((p) => ({
        label: p,
        value: p,
      })),
    },
    enableSorting: false,
  },
  {
    header: strings.createDate,
    id: 'created_at',
    accessorFn: (row) =>
      `${row.created_at ? formatJalali(row.created_at) : '-'}`,
    enableColumnFilter: true,
    meta: {
      label: strings.createDate,
    },
    enableSorting: true,
  },
  {
    header: strings.errorMessage,
    id: 'errorMessage',
    cell(props) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);
      return (
        <>
          <Terminal
            isOpen={open}
            onClose={() => setOpen(false)}
            commands={props.row.original.message}
          />
          <p
            onClick={() => setOpen(true)}
            className="cursor-pointer truncate rounded-sm p-1 hover:shadow-sm"
            dir="ltr"
          >
            {props.row.original.message}
          </p>
        </>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: strings.errorMessage,
      mobileVisible: true,
    },
    enableSorting: false,
    maxSize: 400,
  },
];
