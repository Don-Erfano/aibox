import { strings } from '@/constant';
import { ColumnDef } from '@tanstack/react-table';
import { IConfiguration, IGpuLog } from '@/services/gpu';
import { AibStatus, formatJalali } from '@aibox/ui';
import {
  LogStatusMap,
  MonthlyStatusMap,
  RejectForm,
  ServerStatusMap,
} from './interface';
import { basePackageStatusMap } from '../configuration/constants';
import z from 'zod';

export const monthlyStatusMap: MonthlyStatusMap = {
  Activating: { label: strings.activating, bgColor: 'bg-red-600' },
  Active: { label: strings.active, bgColor: 'bg-green-600' },
  InActive: { label: strings.deactive, bgColor: 'bg-neutral-500' },
  WaitApproval: { label: strings.waitingForAccept, bgColor: 'bg-blue-500' },
  WaitPayment: { label: strings.awaitingPayment, bgColor: 'bg-orange-500' },
};

export const logStatusMap: LogStatusMap = {
  Active: { label: strings.active, bgColor: 'bg-green-600' },
  Canceled: { label: strings.deactive, bgColor: 'bg-neutral-500' },
};

export const ServerStatus: ServerStatusMap = {
  running: { label: strings.runningStatus, bgColor: 'bg-green-600' },
  starting: { label: strings.startingStatus, bgColor: 'bg-blue-500' },
  assign_volume: {
    label: strings.assignVolumeStatus,
    bgColor: 'bg-zinc-600',
  },
  stopped: { label: strings.stoppedStatus, bgColor: 'bg-slate-950' },
  ready: { label: strings.readyStatus, bgColor: 'bg-teal-600' },
  in_queue: { label: strings.inQueue, bgColor: 'bg-orange-500' },
  expired: { label: strings.expiredStatus, bgColor: 'bg-gray-400' },
  system_error: { label: strings.systemError, bgColor: 'bg-red-600' },
  admin_stopped: { label: strings.adminStopped, bgColor: 'bg-zinc-600' },
  admin_cancel: { label: strings.adminCanceled, bgColor: 'bg-red-600/60' },
  cancel: { label: strings.canceled, bgColor: 'bg-red-600/50' },
};

export const logsCol: ({
  packages,
}: {
  packages?: IConfiguration[];
}) => ColumnDef<IGpuLog>[] = ({ packages }) => [
  {
    id: 'user_id',
    header: strings.userName,
    accessorFn: (row) => `${row.email}`,
    meta: {
      label: strings.userName,
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    header: strings.packageName,
    id: 'gpu_motherboard_id',
    accessorFn: (row) => `${row.package_name || '-'}`,
    enableColumnFilter: true,
    meta: {
      label: strings.packageName,
      variant: 'select',
      options: packages?.map((p) => ({
        label: p.gpu,
        value: p.id,
      })),
    },
    enableSorting: false,
  },

  {
    header: strings.packageType,
    id: 'payment_type',
    accessorFn: ({ payment_type }) => basePackageStatusMap[payment_type],
    enableColumnFilter: true,
    meta: {
      label: strings.packageType,
      variant: 'multiSelect',
      options: Object.entries(basePackageStatusMap).map(([value, label]) => ({
        label,
        value,
      })),
    },
    enableSorting: false,
  },
  {
    id: 'activated_at',
    header: strings.activatedTime,
    accessorFn: (row) => `${formatJalali(row.activated_at)}`,
    enableColumnFilter: true,
    meta: {
      label: strings.activatedTime,
      variant: 'dateRange',
    },
    enableSorting: true,
  },
  {
    id: 'usage_time',
    header: strings.usage,
    accessorFn: (row) => `${row.usage_time}`,
    enableColumnFilter: true,
    meta: {
      label: strings.usage,
      variant: 'range',
      range: [0, 1000],
      showSlider: true,
    },
    enableSorting: true,
  },
  {
    id: 'monthly_status',
    header: strings.monthlyPackageStatus,
    accessorKey: 'monthly_status',
    cell: ({ row }) => {
      const { monthly_status } = row.original;
      return monthly_status
        ? AibStatus({
            label: monthlyStatusMap[monthly_status].label,
            bgColor: `text-zinc-700 ${monthlyStatusMap[monthly_status].bgColor}`,
          })
        : '—';
    },
    meta: {
      label: strings.monthlyPackageStatus,
      variant: 'multiSelect',
      options: Object.entries(monthlyStatusMap).map(([value, { label }]) => ({
        label,
        value,
      })),
    },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    id: 'status',
    header: strings.status,
    accessorKey: 'status',
    cell: ({ row }) => {
      const { status } = row.original;
      return status
        ? AibStatus({
            label: logStatusMap[status].label,
            bgColor: status === 'Active' ? 'bg-green-600' : 'bg-gray-500',
          })
        : '—';
    },
    enableColumnFilter: true,
    meta: {
      label: strings.status,
      variant: 'select',
      options: Object.entries(logStatusMap).map(([value, { label }]) => ({
        label,
        value,
      })),
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    id: 'server_status',
    header: strings.serverStatus,
    accessorKey: 'server_status',
    enableColumnFilter: true,
    cell: ({ row }) => {
      const { server_status } = row.original;
      return server_status
        ? AibStatus({
            label: ServerStatus[server_status].label,
            bgColor: `text-zinc-700 ${ServerStatus[server_status].bgColor}`,
          })
        : '—';
    },
    meta: {
      label: strings.serverStatus,
      variant: 'multiSelect',
      options: Object.entries(ServerStatus).map(([value, { label }]) => ({
        label,
        value,
      })),
      mobileVisible: true,
    },
    enableSorting: false,
  },
];

export const rejectFormSchema = z.object({
  message: z.string().max(300).nonempty(),
});

export const rejectFormDefaultValues: RejectForm = {
  message: 'درخواست سرور پردازشی ماهانه شما تایید نشد.',
};

export const changePackageFormSchema = z.object({
  gpu_motherboard_id: z.string().min(1),
  disk_id: z.string().min(1),
  plan_id: z.string().min(1),
  status: z.string().min(1),
});
