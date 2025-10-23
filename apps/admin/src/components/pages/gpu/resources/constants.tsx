'use client';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { strings } from '@/constant';
import { GPU_ROUTES } from '@/routes';
import { AibStatus } from '@aibox/ui';
import { INode, IResourceDetail } from '@/services/gpu';
import { useParams } from 'next/navigation';

export const resourceCol: (
  profiles: string[]
) => ColumnDef<IResourceDetail>[] = (profiles) => [
  {
    id: 'profile',
    header: strings.modelName,
    accessorKey: 'profile',
    cell: ({ row }) => {
      const { id } = useParams();
      return (
        <div className="flex items-center space-x-2">
          <Link
            href={`${GPU_ROUTES.RESOURCE}/${id}/${row.original.profile}`}
            className="text-sm font-normal text-teal-600 underline"
          >
            {row.original.profile}
          </Link>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: strings.modelName,
      mobileVisible: true,
      variant: 'select',
      options: profiles.map((p) => ({
        label: p,
        value: p,
      })),
    },
    enableSorting: false,
  },
  {
    header: strings.totalCount,
    id: 'total',
    accessorFn: (row) => `${row.total}`,
    enableColumnFilter: true,
    meta: {
      label: strings.totalCount,
    },
    enableSorting: false,
  },
  {
    header: strings.freeCount,
    id: 'free',
    accessorFn: (row) => `${row.free}`,
    enableColumnFilter: true,
    meta: {
      label: strings.freeCount,
      mobileVisible: true,
    },
    enableSorting: true,
  },
  {
    header: strings.modelInfo,
    id: 'gpu_info',
    accessorFn: (row) => `${row.gpu_info}`,
    enableColumnFilter: true,
    meta: {
      label: strings.modelInfo,
    },
    enableSorting: false,
    maxSize: 400,
  },
];

export const modelCol: ColumnDef<INode>[] = [
  {
    id: 'node_name',
    header: strings.nodeName,
    accessorFn: (row) => `${row.node_name}`,
    enableColumnFilter: true,
    meta: {
      label: strings.nodeName,
      mobileVisible: true,
    },
    enableSorting: false,
  },
  {
    header: strings.podName,
    id: 'pod_name',
    accessorFn: (row) => `${row.pod_name}`,
    enableColumnFilter: true,
    meta: {
      label: strings.podName,
    },
    enableSorting: false,
  },
  {
    header: strings.status,
    id: 'status',
    accessorKey: 'status',
    cell: ({ row }) =>
      AibStatus({
        label: row.original.status === 'free' ? strings.free : strings.inUse,
        bgColor: row.original.status === 'free' ? 'bg-green-600' : 'bg-red-500',
      }),
    enableColumnFilter: true,
    meta: {
      label: strings.status,
      mobileVisible: true,
      variant: 'select',
      options: [
        {
          label: strings.free,
          value: 'free',
        },
        {
          label: strings.inUse,
          value: 'false',
        },
      ],
    },
    enableSorting: false,
    maxSize: 400,
  },
];
