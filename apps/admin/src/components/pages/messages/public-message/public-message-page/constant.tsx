'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IMassNotification } from '@/services/messages/messages-list/interface';
import { AibStatus, formatJalali } from '@aibox/ui';

const statusMap: Record<string, { label: string; bgColor: string }> = {
  showing: {
    label: 'در حال نمایش',
    bgColor: 'bg-green-500 ',
  },
  in_progress: {
    label: 'برنامه‌ریزی شده جهت ارسال',
    bgColor: 'bg-blue-500 ',
  },
  fail: {
    label: 'ناموفق',
    bgColor: 'bg-red-600 ',
  },
  send: {
    label: 'ارسال شده',
    bgColor: 'bg-gray-500 ',
  },
};
const safeFormat = (dateStr?: string): string => {
  if (!dateStr) return '';
  const formatted = formatJalali(dateStr);
  return formatted === 'Invalid date' ? '' : formatted;
};
const publicMessageColumns: ColumnDef<IMassNotification>[] = [
  {
    accessorKey: 'user',
    header: 'مقصد',
  },
  {
    accessorKey: 'category',
    header: 'دسته‌بندی',
  },
  {
    accessorKey: 'name',
    header: 'نام پیام گروهی',
  },
  {
    id: 'sendInterval',
    header: 'بازه ارسال',
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
    meta: { label: 'بازه ارسال', variant: 'date' },
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, bgColor } = statusMap[key] || {
        label: key,
        bgColor: 'bg-gray-400 text-gray-400',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
    meta: { label: 'وضعیت', variant: 'select' },
  },
  {
    accessorKey: 'message_title',
    header: 'متن پیام',
  },
];

export default publicMessageColumns;
