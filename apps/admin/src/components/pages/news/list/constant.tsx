import { strings } from '@/constant';
import { INews } from '@/services/news/interface';
import { formatJalali } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';

export const newsMockData = [
  {
    id: 1,
    title: 'افتتاح فاز جدید بیمارستان شهید بهشتی',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T09:30:00Z',
  },
  {
    id: 2,
    title: 'برگزاری همایش پزشکان عمومی در تهران',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T11:15:00Z',
  },
  {
    id: 3,
    title: 'راه‌اندازی کلینیک تخصصی قلب',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T14:45:00Z',
  },
  {
    id: 4,
    title: 'اعلام تعرفه‌های جدید خدمات درمانی',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T16:00:00Z',
  },
  {
    id: 5,
    title: 'افتتاح بخش جدید زایمان',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T18:20:00Z',
  },
  {
    id: 6,
    title: 'راه‌اندازی سامانه نوبت‌دهی آنلاین',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T08:10:00Z',
  },
  {
    id: 7,
    title: 'همکاری جدید با انجمن دندان‌پزشکان ایران',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T10:05:00Z',
  },
  {
    id: 8,
    title: 'احداث درمانگاه شبانه‌روزی',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T12:30:00Z',
  },
  {
    id: 9,
    title: 'ارائه خدمات جدید آزمایشگاهی',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T15:45:00Z',
  },
  {
    id: 10,
    title: 'آغاز واکسیناسیون دانش‌آموزان',
    description: 'شرح خبر در این قسمت نمایش داده می‌شود.',
    created_at: '2022-06-02T17:25:00Z',
  },
];

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
    accessorKey: 'content',
    id: 'content',
    header: strings.newsDescription,
    enableColumnFilter: true,
    meta: { label: strings.newsDescription, variant: 'text' },
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
