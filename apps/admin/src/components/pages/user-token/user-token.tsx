'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import tokenColumns from './constant';

import { useGetAccessTokenList } from '@/services/user/user-token';

const UserToken: FC = () => {
  const { user, totalItems, totalPages, isLoading, refetch } =
    useGetAccessTokenList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: user,
    columns: tokenColumns,
    pageCount: totalPages,
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <div className="flex mb-2">
        <h3>توکن‌ها</h3>
        <div className="h-8 w-8 mr-2 rounded-full bg-slate-950 text-center">
          <p className="w-full text-sm mt-1.5 text-white">{totalItems}</p>
        </div>
      </div>

      <TableToolbar
        table={table}
        title="لیست توکن‌ها"
        refetch={refetch}
        refreshLoading={isLoading}
        totalItems={totalItems}
        submitFilters={submitFilters}
        filterCount={filterCount}
        resetFilters={resetFilters}
        noManageColumns
      />

      <DataTable table={table} />
    </div>
  );
};

export default UserToken;
