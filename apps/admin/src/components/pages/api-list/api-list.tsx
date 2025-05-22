'use client';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import userColumns from './constants';
import { useGetApiList } from '@/services';
import { Ban, CircleCheck, CircleX } from 'lucide-react';

const ApiList = () => {
  const { apis, totalItems, totalPages, isLoading, refetch } = useGetApiList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: apis,
    columns: userColumns,
    pageCount: totalPages,
    actions: {
      customActions: [
        {
          label: 'تأیید کردن',
          icon: <CircleCheck />,
          onClick: () => console.log('click'),
        },
        {
          label: 'رد کردن',
          icon: <CircleX />,
          onClick: () => console.log('click'),
        },
        {
          label: 'منقضی کردن',
          icon: <Ban />,
          onClick: () => console.log('click'),
        },
      ],
    },
  });

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <TableToolbar
        title="لیست APIها"
        totalItems={totalItems}
        table={table}
        refreshLoading={isLoading}
        refetch={refetch}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />

      <DataTable table={table} />
    </div>
  );
};

export default ApiList;
