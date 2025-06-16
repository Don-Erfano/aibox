import { ColumnDef } from '@tanstack/react-table';

import { formatJalali } from '@aibox/ui';

import Link from 'next/link';
import { API_PLATFORM_ROUTES } from '@/routes';
import { IUserApiPackageDetail } from '@/services';

const USERAPIPACKAGES: ColumnDef<IUserApiPackageDetail>[] = [
  {
    header: 'نام API',
    id: 'name',
    accessorFn: (row) => `${row.package.api}`,
    cell: ({ getValue, row }) => {
      const apiName = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-neutral-200 border border-teal-600" />
          <Link
            href={`${API_PLATFORM_ROUTES.APIS}/${row.original.id}`}
            className="text-teal-600 text-sm font-normal underline"
          >
            {apiName}
          </Link>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: { label: 'نام API', variant: 'text' },
    enableSorting: false,
  },

  {
    header: 'ورژن',
    id: 'version',
    accessorKey: 'package.version',
    enableSorting: false,
  },
  {
    header: 'نوع پلن',
    id: 'paln',
    accessorFn: ({ package: apiPackage }) =>
      apiPackage?.type === 'PER_USE' ? 'فراخوانی' : 'ماهانه',
    enableSorting: false,
  },
  {
    header: 'تاریخ فعال‌سازی',
    id: 'status_date',
    accessorFn: ({ created_at }) =>
      created_at ? formatJalali(created_at).split(' ')[1] : '-',
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: 'تاریخ فعال‌سازی',
      variant: 'dateRange',
    },
  },
  {
    header: 'فراخوانی روزانه (بیشینه)',
    accessorFn: ({ package: apiPackage }) => apiPackage?.daily_limit || '-',
    enableColumnFilter: true,
    meta: {
      label: 'فراخوانی روزانه (بیشینه)',
      variant: 'range',
    },
  },
  {
    header: 'فراخوانی ماهانه (بیشینه)',
    accessorFn: ({ package: apiPackage }) => apiPackage?.monthly_limit || '-',
    enableColumnFilter: true,
    meta: {
      label: 'فراخوانی ماهانه (بیشینه)',
      variant: 'range',
    },
  },
];
export { USERAPIPACKAGES };
