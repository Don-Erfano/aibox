import Image from 'next/image';
import { strings } from '@/constant';
import { IDeploymentResult } from '@/services/operation-service/interface';
import { AibStatus, AvatarIcon } from '@aibox/ui';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX } from 'lucide-react';

const colorMap: Record<string, { label: string; bgColor: string }> = {
  NEED_TIME: {
    label: strings.prepare,
    bgColor: 'bg-teal-600',
  },
  PROCESSING: {
    label: strings.prepare,
    bgColor: 'bg-teal-600',
  },
  RUNNING: {
    label: strings.running,
    bgColor: 'bg-green-600',
  },
  PENDING: {
    label: strings.pending,
    bgColor: 'bg-blue-500',
  },
  OFF: {
    label: strings.turnedOff,
    bgColor: 'bg-gray-500',
  },
  FAIL: {
    label: strings.error,
    bgColor: 'bg-red-600',
  },
  CANCEL: {
    label: strings.canceled,
    bgColor: 'bg-red-300',
  },
  ADMIN_OFF: {
    label: strings.shutDownByAdmin,
    bgColor: 'bg-zinc-700',
  },
  ASSIGN_VOLUME: {
    label: strings.shutDownByAssign,
    bgColor: 'bg-zinc-600',
  },
};

const serversColumns: ColumnDef<IDeploymentResult>[] = [
  {
    accessorKey: 'deployment_name',
    id: 'deployment_name',
    header: 'Deployment',
    enableSorting: false,
    maxSize: 160,
  },
  {
    accessorKey: 'api_name',
    id: 'api_name',
    header: strings.apiName,
    enableSorting: false,
    enableColumnFilter: true,
    maxSize: 200,
    meta: { label: strings.apiName, mobileVisible: true },
    cell: ({ row }) => {
      const { api_image, api_name } = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 flex justify-center items-center border border-teal-600 rounded-full">
            {api_image ? (
              <Image
                src={api_image}
                style={{ borderRadius: '100%' }}
                alt={api_name}
                width={32}
                height={32}
              />
            ) : (
              <AvatarIcon />
            )}
          </div>
          <p>{api_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'label',
    id: 'label',
    header: 'Label',
    enableColumnFilter: true,
    meta: { label: strings.createdDate, variant: 'select' },
    maxSize: 80,
  },
  {
    header: strings.useGpu,
    accessorKey: 'use_gpu',
    id: 'use_gpu',
    enableColumnFilter: true,
    meta: { label: strings.useGpu, variant: 'select' },
    enableSorting: false,
    maxSize: 120,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      return (
        <AibStatus
          label={key ? strings.yes : strings.no}
          icon={
            key ? (
              <CircleCheck
                className="text-green-600 size-5"
                strokeWidth={1.5}
              />
            ) : (
              <CircleX className="text-red-600 size-5" strokeWidth={1.5} />
            )
          }
          sizeClass="w-5 h-5"
        />
      );
    },
  },
  {
    accessorKey: 'cpu',
    id: 'cpu',
    header: strings.cpuUsage,
    maxSize: 160,
  },
  {
    accessorKey: 'ram',
    id: 'ram',
    header: strings.ramUsage,
    enableColumnFilter: true,
    maxSize: 160,
  },

  {
    header: strings.status,
    accessorKey: 'status',
    id: 'status',
    meta: { label: 'وضعیت', variant: 'select', mobileVisible: true },
    enableColumnFilter: true,
    enableSorting: false,
    cell: ({ getValue }) => {
      const key = getValue() as string;
      const { label, bgColor } = colorMap[key] ?? {
        label: key,
        bgColorClass: 'bg-gray-300',
      };
      return <AibStatus label={label} bgColor={bgColor} />;
    },
  },
];

export default serversColumns;
