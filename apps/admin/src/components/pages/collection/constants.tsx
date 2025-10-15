'use client';
import { AibStatus, CategoryIcon, formatJalali, Option } from '@aibox/ui';
import { QueryObserverResult } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { strings } from '@/constant';

import { Collection } from './interface';

export const statusOptions = [
  { label: strings.successful, value: 'true' },
  { label: strings.unsuccessful, value: 'false' },
];

export const apiOrderOptions: Option[] = [
  { label: strings.createdTime, value: '-created_at' },
  { label: strings.name, value: 'name' },
  { label: strings.requestsNum, value: '-requests' },
  { label: strings.usersNum, value: '-enroll_count' },
  { label: strings.rate, value: '-rating_count' },
  { label: strings.earningAmount, value: '-earning' },
];

export const mockRefetch = () =>
  Promise.resolve({} as QueryObserverResult<Collection[], Error>);

export const collectionMockData: Collection[] = [
  {
    id: 'b33ae923-7468-44e2-839f-1db213b4aa2c',
    name: 'تست تست تست تست تست تست تست تست تست تست تست تست',
    created_at: '2024-09-22T08:33:32.463897',
    updated_at: '2024-09-22T09:48:44.945920',
    english_name: 'teeeest-testttttttttt-tessssssssst-tests-test-tte',
    is_active: false,
    rank: 0,
    picture: '',
  },
  {
    id: '314fe748-0707-409f-9655-e55ba9d8d5ad',
    name: 'سرویس‌های رایگان',
    created_at: '2022-05-12T06:34:16.054000',
    updated_at: '2023-12-05T06:41:34.582000',
    rank: 10,
    english_name: 'free-apis',
    is_active: true,
    picture: '',
  },
  {
    id: 'f276aa25-4cfe-4b6a-8908-ac763d88101b',
    name: 'اسکنر',
    created_at: '2022-03-08T11:03:39.846000',
    updated_at: '2023-12-05T07:39:19.363000',
    rank: 10,
    english_name: 'scanner-apis',
    is_active: false,
    picture: '',
  },
  {
    id: 'a775702a-abc2-4874-9bbc-6ba5c763cccc',
    name: 'تصویرسازی',
    created_at: '2022-03-08T10:57:45.724000',
    updated_at: '2023-12-05T07:40:10.403000',
    rank: 9,
    english_name: 'image-generator-apis',
    is_active: true,
    picture: '',
  },
  {
    id: '07cbffae-5f6d-43e8-b3d1-bd915f5ab950',
    name: 'تشخیص اشیاء',
    created_at: '2022-03-08T10:54:06.360000',
    updated_at: '2023-12-05T07:41:01.863000',
    rank: 8,
    english_name: 'object-detection-apis',
    is_active: true,
    picture: '',
  },
];

export const collectionColumns: ColumnDef<Collection>[] = [
  {
    header: strings.collectionName,
    id: 'name',
    accessorKey: 'name',
    enableSorting: false,
    cell: ({ row }) => {
      const { name, picture } = row.original;
      return (
        <div className="flex w-full items-center gap-2">
          <div className="size-8 flex justify-center items-center border border-teal-600 rounded-full">
            {picture ? (
              <Image
                src={picture}
                style={{ borderRadius: '100%' }}
                alt={name}
                width={32}
                height={32}
              />
            ) : (
              <CategoryIcon className="size-7 rounded-full bg-gray-300" />
            )}
          </div>
          <p className="truncate max-w-32">{name}</p>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      variant: 'text',
      label: strings.collectionName,
    },
  },
  {
    header: strings.createdDate,
    id: 'created_at',
    accessorKey: 'created_at',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
    enableColumnFilter: true,
    meta: {
      variant: 'date',
      label: strings.createdDate,
    },
  },
  {
    header: strings.lastEdit,
    id: 'updated_at',
    accessorKey: 'updated_at',
    cell: ({ getValue }) =>
      getValue() ? formatJalali(getValue() as string) : '—',
    enableColumnFilter: true,
    meta: {
      variant: 'date',
      label: strings.lastEdit,
    },
  },
  {
    header: strings.showOrder,
    id: 'rank',
    accessorKey: 'rank',
    enableColumnFilter: true,
    meta: {
      variant: 'text',
      label: strings.showOrder,
    },
  },
  {
    header: strings.status,
    id: 's_active',
    accessorKey: 'is_active',
    enableSorting: false,
    cell: ({ getValue }) => (
      <AibStatus
        label={getValue() ? strings.successful : strings.unsuccessful}
        bgColor={getValue() ? 'bg-green-600' : 'bg-red-600'}
      />
    ),
    enableColumnFilter: true,
    meta: {
      variant: 'select',
      label: strings.status,
      options: statusOptions,
    },
  },
];
