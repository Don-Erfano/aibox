'use client';

import { FC } from 'react';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import userColumns from './constants';
import { useGetApiList } from '@/services';

const ApiList: FC = () => {
  const { apis, totalItems, totalPages, isLoading, refetch } = useGetApiList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: apis,
    columns: userColumns,
    pageCount: totalPages,
  });

  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.apisList}
          totalItems={totalItems}
          table={table}
          refreshLoading={isLoading}
          refetch={refetch}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <DataTable
          table={table}
          className="[&>table>thead>tr>th]:last:justify-items-center"
        />
      </div>
    </div>
  );
};

export default ApiList;
