import { strings } from '@/constant';
import { ILogData } from '@/services';
import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

const logsColumn: ColumnDef<ILogData>[] = [
  {
    header: strings.userName,
    id: 'nick_name',
    enableSorting: false,
    maxSize: 140,
    cell: ({ row }) => {
      const picture = row.original.profile_picture;

      return (
        <Link
          href={`#`}
          className="flex items-center space-x-2 underline text-teal-600"
        >
          <Image
            src={picture || '/images/default-user.svg'}
            alt={row.original.nick_name}
            width={32}
            height={32}
            className="object-cover border-1 border-teal-600 rounded-full"
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-teal-600">
            {row.original.nick_name}
          </span>
        </Link>
      );
    },
  },
  {
    header: strings.apiCount,
    id: 'api_count',
    accessorKey: 'api_count',
  },
  {
    header: strings.earningProfit,
    id: 'header',
    accessorKey: 'all_earning',
  },
  {
    header: strings.totalRequestsCount,
    id: 'header',
    accessorKey: 'all_requests',
  },
  {
    header: strings.avrageLatencyMs,
    id: 'header',
    accessorKey: 'avg_delay_time_millisecond',
  },
  {
    header: strings.avrageSatisfaction,
    id: 'header',
    accessorKey: 'avg_api_rate',
  },
  {
    header: strings.registerDate,
    id: 'header',
    accessorFn: ({ created_at }) =>
      created_at ? formatJalali(created_at).split(' ')[1] : '-',
  },
];

export { logsColumn };
