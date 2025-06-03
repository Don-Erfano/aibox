import { ColumnDef } from '@tanstack/react-table';
import { AibStatus, formatJalali } from '@aibox/ui';
import { ITicket } from '@/services/ticketing/ticketing-list/interface';

export const toggleItems = [
  { value: 'self', label: 'تخصیص به خود' },
  { value: 'others', label: 'تخصیص به دیگران' },
];

const statusMap: Record<string, { label: string; bgColor: string }> = {
  opened: {
    label: 'باز',
    bgColor: 'bg-blue-500',
  },
  waiting_user: {
    label: 'در انتظار پاسخ کاربر',
    bgColor: 'bg-purple-600',
  },
  waiting_you: {
    label: 'در انتظار پاسخ شما',
    bgColor: 'bg-teal-600',
  },
  closed: {
    label: 'بسته',
    bgColor: 'bg-red-600',
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
    maxSize: 160,
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: 'تاریخ ایجاد',
    cell: ({ getValue }) => formatJalali(getValue() as string),
    enableColumnFilter: true,
    meta: { label: 'تاریخ ایجاد', variant: 'date' },
    maxSize: 160,
  },
  {
    accessorKey: 'operator_id',
    id: 'operator_id',
    header: 'اپراتور',
    enableColumnFilter: true,
    meta: { label: 'اپراتور', variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'user_id',
    id: 'user_id',
    header: 'کاربر',
    enableColumnFilter: true,
    meta: { label: 'کاربر', variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'category',
    id: 'category',
    header: 'دسته بندی',
    enableColumnFilter: true,
    meta: { label: 'دسته بندی', variant: 'select' },
    maxSize: 160,
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
    maxSize: 160,
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
    maxSize: 160,
  },
  {
    accessorKey: 'subject',
    id: 'subject',
    header: 'عنوان درخواست',
    meta: { label: 'عنوان درخواست', variant: 'text' },
    maxSize: 160,
  },
];

export default ticketColumns;
