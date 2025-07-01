import { strings } from '@/constant';
import { INews } from '@/services/news/interface';
import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

const newsColumns: ColumnDef<INews>[] = [
  {
    accessorKey: 'title',
    id: 'title',
    header: strings.title,
    meta: { label: strings.requestId, variant: 'text' },
    maxSize: 160,
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: strings.newsDescription,
    enableColumnFilter: true,
    meta: { label: strings.operator, variant: 'text' },
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
];

export default newsColumns;
