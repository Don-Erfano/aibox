import { strings } from '@/constant';
import { INews } from '@/services/news/interface';
import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

const newsColumns: ColumnDef<INews>[] = [
  {
    accessorKey: 'title',
    id: 'title',
    header: strings.title,
    enableColumnFilter: true,
    meta: { label: strings.title, variant: 'text' },
    maxSize: 160,
  },
  {
    accessorKey: 'summary',
    id: 'summary',
    header: strings.newsSummary,
    enableColumnFilter: true,
    meta: { label: strings.newsSummary, variant: 'text' },
    maxSize: 160,
  },
  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: strings.publishDate,
    cell: ({ getValue }) => formatJalali(getValue() as string),
    enableColumnFilter: true,
    meta: { label: strings.createdDate, variant: 'date' },
    maxSize: 160,
  },
];

export default newsColumns;
