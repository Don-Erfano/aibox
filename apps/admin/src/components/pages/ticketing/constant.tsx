import { ColumnDef } from '@tanstack/react-table';
import { AibStatus } from '@aibox/ui';
import { ITicket } from '@/services/ticketing/ticketing-list/interface';

export const toggleItems = [
  { value: 'self', label: 'تخصیص به خود' },
  { value: 'others', label: 'تخصیص به دیگران' },
];

const statusMap: Record<string, { label: string; bgColor: string }> = {
  opened: {
    label: 'باز',
    bgColor: 'bg-blue-500 text-zinc-700',
  },
  waiting_user: {
    label: 'در انتظار پاسخ کاربر',
    bgColor: 'bg-purple-600 text-zinc-700',
  },
  waiting_you: {
    label: 'در انتظار پاسخ شما',
    bgColor: 'bg-teal-600 text-zinc-700',
  },
  closed: {
    label: 'بسته',
    bgColor: 'bg-red-600 text-zinc-700',
  },
};

const levelMap: Record<string, { label: string; bgColor: string }> = {
  high: {
    label: 'بالا',
    bgColor: 'bg-orange-500',
  },
  medium: {
    label: 'متوسط',
    bgColor: 'bg-cyan-300',
  },
  low: {
    label: 'پایین',
    bgColor: 'bg-gray-600',
  },
};

const ticketColumns: ColumnDef<ITicket>[] = [
  {
    accessorKey: 'ticket_num',
    id: 'ticket_num',
    header: 'شماره درخواست',
    meta: { label: 'شماره درخواست', variant: 'text' },
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: 'تاریخ ایجاد',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    enableColumnFilter: true,
    meta: { label: 'تاریخ ایجاد', variant: 'date' },
  },
  {
    accessorKey: 'operator_id',
    id: 'operator_id',
    header: 'اپراتور',
    enableColumnFilter: true,
    meta: { label: 'اپراتور', variant: 'select' },
  },
  {
    accessorKey: 'user_id',
    id: 'user_id',
    header: 'کاربر',
    enableColumnFilter: true,
    meta: { label: 'کاربر', variant: 'select' },
  },
  {
    accessorKey: 'category',
    id: 'category',
    header: 'دسته بندی',
    enableColumnFilter: true,
    meta: { label: 'دسته بندی', variant: 'select' },
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'وضعیت',
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, bgColor } = statusMap[key] ?? {
        label: key,
        bgColorClass: 'bg-gray-300',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    enableColumnFilter: true,
    meta: { label: 'وضعیت', variant: 'select' },
  },

  {
    accessorKey: 'level',
    id: 'level',
    header: 'اولویت',
    cell: ({ getValue }) => {
      const key = (getValue() as string).toLowerCase();
      const { label, bgColor } = levelMap[key] ?? {
        label: key,
        bgColorClass: 'bg-gray-300',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    enableColumnFilter: true,
    meta: { label: 'اولویت', variant: 'select' },
  },
  {
    accessorKey: 'subject',
    id: 'subject',
    header: 'عنوان درخواست',
    meta: { label: 'عنوان درخواست', variant: 'text' },
  },
];

export default ticketColumns;
