import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { formatJalali } from '@aibox/ui';

import { strings } from '@/constant';
import { API_PLATFORM_ROUTES } from '@/routes';
import { IUserApiPackageDetail } from '@/services';

const USERAPIPACKAGES: ColumnDef<IUserApiPackageDetail>[] = [
  {
    header: strings.apiName,
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
    meta: { label: strings.apiName, variant: 'text' },
    enableSorting: false,
  },

  {
    header: strings.version,
    id: 'version',
    accessorKey: 'package.version',
    enableSorting: false,
  },
  {
    header: strings.planType,
    id: 'paln',
    accessorFn: ({ package: apiPackage }) =>
      apiPackage?.type === 'PER_USE' ? strings.request : strings.monthly,
    enableSorting: false,
  },
  {
    header: strings.activatedDate,
    id: 'status_date',
    accessorFn: ({ created_at }) =>
      created_at ? formatJalali(created_at).split(' ')[1] : '-',
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: strings.activatedDate,
      variant: 'dateRange',
    },
  },
  {
    header: strings.maxDailyRequest,
    accessorFn: ({ package: apiPackage }) => apiPackage?.daily_limit || '-',
    enableColumnFilter: true,
    meta: {
      label: strings.maxDailyRequest,
      variant: 'range',
    },
  },
  {
    header: strings.maxMonthlyRequest,
    accessorFn: ({ package: apiPackage }) => apiPackage?.monthly_limit || '-',
    enableColumnFilter: true,
    meta: {
      label: strings.maxMonthlyRequest,
      variant: 'range',
    },
  },
];
export { USERAPIPACKAGES };
