'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IMassNotification } from '@/services/messages/messages-list/interface';
import { AibStatus, formatJalali } from '@aibox/ui';
import { strings } from '@/constant';

const statusMap: Record<string, { label: string; bgColor: string }> = {
  showing: {
    label: strings.showing,
    bgColor: 'bg-green-500 ',
  },
  in_progress: {
    label: strings.scheduledToSend,
    bgColor: 'bg-blue-500 ',
  },
  fail: {
    label: strings.unsuccessful,
    bgColor: 'bg-red-600 ',
  },
  send: {
    label: strings.sent,
    bgColor: 'bg-gray-500 ',
  },
};
const safeFormat = (dateStr?: string): string => {
  if (!dateStr) return '';
  const formatted = formatJalali(dateStr);
  return formatted === 'Invalid date' ? '' : formatted;
};
const NotifListColumns: ColumnDef<IMassNotification>[] = [
  {
    accessorKey: 'user',
    header: strings.destination,
  },
  {
    accessorKey: 'category',
    header: strings.category,
  },
  {
    accessorKey: 'name',
    header: strings.generalMessageText,
  },
  {
    id: 'sendInterval',
    header: strings.sendTimeRange,
    cell: ({ row }) => {
      const from = safeFormat(row.original.from_time);
      const to = safeFormat(row.original.to_time);

      if (!from && !to) {
        return <span />;
      }
      return (
        <span>
          {from}
          {from && to ? ` – ${to}` : ''}
        </span>
      );
    },
    meta: { label: strings.sendTimeRange, variant: 'date' },
  },
  {
    accessorKey: 'status',
    header: strings.status,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, bgColor } = statusMap[key] || {
        label: key,
        bgColor: 'bg-gray-400 text-gray-400',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    meta: { label: strings.status, variant: 'select' },
  },
  {
    accessorKey: 'message_title',
    header: strings.messageText,
  },
];

export default NotifListColumns;
