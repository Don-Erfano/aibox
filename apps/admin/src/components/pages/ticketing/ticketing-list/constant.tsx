import { ColumnDef } from '@tanstack/react-table';
import { AibStatus, formatJalali } from '@aibox/ui';
import { ITicket } from '@/services/ticketing/ticketing-list/interface';
import { strings } from '@/constant';

export const toggleItems = [
  { value: 'self', label: strings.assignToMe },
  { value: 'others', label: strings.assignToOthers },
];

const statusMap: Record<string, { label: string; bgColor: string }> = {
  opened: {
    label: strings.opened,
    bgColor: 'bg-blue-500',
  },
  waiting_user: {
    label: strings.waitingforUser,
    bgColor: 'bg-purple-600',
  },
  waiting_you: {
    label: strings.waitingForYou,
    bgColor: 'bg-teal-600',
  },
  closed: {
    label: strings.closed,
    bgColor: 'bg-red-600',
  },
};

const levelMap: Record<string, { label: string; bgColor: string }> = {
  high: {
    label: strings.up,
    bgColor: 'bg-orange-500',
  },
  medium: {
    label: strings.medium,
    bgColor: 'bg-cyan-300',
  },
  low: {
    label: strings.down,
    bgColor: 'bg-gray-600',
  },
};

const ticketColumns: ColumnDef<ITicket>[] = [
  {
    accessorKey: 'ticket_num',
    id: 'ticket_num',
    header: strings.requestId,
    meta: { label: strings.requestId, variant: 'text' },
    maxSize: 160,
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: strings.createdDate,
    cell: ({ getValue }) => formatJalali(getValue() as string),
    enableColumnFilter: true,
    meta: { label: strings.createdDate, variant: 'date' },
    maxSize: 160,
  },
  {
    accessorKey: 'operator_id',
    id: 'operator_id',
    header: strings.operator,
    enableColumnFilter: true,
    meta: { label: strings.operator, variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'user_id',
    id: 'user_id',
    header: strings.user,
    enableColumnFilter: true,
    meta: { label: strings.user, variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'category',
    id: 'category',
    header: strings.category,
    enableColumnFilter: true,
    meta: { label: strings.category, variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: strings.status,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, bgColor } = statusMap[key] ?? {
        label: key,
        bgColorClass: 'bg-gray-300',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    enableColumnFilter: true,
    meta: { label: strings.status, variant: 'select' },
    maxSize: 160,
  },

  {
    accessorKey: 'level',
    id: 'level',
    header: strings.priority,
    cell: ({ getValue }) => {
      const key = (getValue() as string).toLowerCase();
      const { label, bgColor } = levelMap[key] ?? {
        label: key,
        bgColorClass: 'bg-gray-300',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    enableColumnFilter: true,
    meta: { label: strings.priority, variant: 'select' },
    maxSize: 160,
  },
  {
    accessorKey: 'subject',
    id: 'subject',
    header: strings.subject,
    meta: { label: strings.subject, variant: 'text' },
    maxSize: 160,
  },
];

export default ticketColumns;
