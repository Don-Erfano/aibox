import { CategoryIcon, formatJalali, Option } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { strings } from '@/constant';
import { UsersApiPackage } from '@/services/api-package';

export const packagePlanMap: Record<string, string> = {
  per_use_package: strings.payPerUsage,
  free_package: strings.freePackage,
  step_package: strings.stepPackage,
};

export const packageTypeMap: Record<string, string> = {
  PER_USE: strings.requestsCount,
  MONTHLY_SUB: strings.monthly,
  STEP_PRICE: strings.stepPrice,
};

export const getLogsTableColumns = ({
  usersOptions,
  apisOptions,
}: {
  usersOptions?: Option[];
  apisOptions?: Option[];
}): ColumnDef<UsersApiPackage>[] => [
  {
    header: strings.userName,
    id: 'user_id',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: strings.userName,
      options: usersOptions,
      variant: 'select',
      mobileVisible: true,
    },
    accessorFn: ({ user }) => user,
    cell: ({ row }) => {
      const { profile_picture, nick_name } = row.original.user;
      return (
        <div className="flex w-full items-center gap-2">
          <div className="size-8 flex justify-center items-center border border-zinc-800 rounded-full">
            {profile_picture ? (
              <Image
                src={profile_picture}
                style={{ borderRadius: '100%' }}
                alt={nick_name}
                width={20}
                height={20}
              />
            ) : (
              <CategoryIcon className="size-7 rounded-full bg-gray-300" />
            )}
          </div>
          <p className="truncate max-w-32">{nick_name}</p>
        </div>
      );
    },
  },
  {
    header: strings.apiName,
    id: 'api__name',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: strings.apiName,
      options: apisOptions,
      variant: 'select',
      mobileVisible: true,
    },
    accessorFn: (row) => row.package.api,
  },
  {
    header: strings.version,
    id: 'version',
    enableSorting: false,
    enableColumnFilter: true,
    meta: { label: strings.version, variant: 'text' },
    accessorFn: (row) => row.package.version,
  },
  {
    header: strings.packageType,
    id: 'type',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: strings.packageType,
      options: Object.entries(packageTypeMap).map(([value, label]) => ({
        label,
        value,
      })),
      variant: 'select',
    },
    accessorFn: (row) => packageTypeMap[row.package.type],
  },
  {
    header: strings.plan,
    id: 'name',
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: strings.plan,
      options: Object.entries(packagePlanMap).map(([value, label]) => ({
        label,
        value,
      })),
      variant: 'select',
    },
    accessorFn: (row) => packagePlanMap[row.package.name],
  },
  {
    header: strings.activatedTime,
    id: 'created_at',
    accessorKey: 'created_at',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
  },
  {
    header: strings.expiredDate,
    id: 'expired_date',
    accessorKey: 'expired_date',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
  },
  {
    header: strings.requestsCount,
    id: 'count_api_call',
    accessorKey: 'count_api_call',
  },
];
