'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import tokenColumns from './constant';

import { useGetAccessTokenList } from '@/services/user/user-token';
import { UserTokenString } from '@/components/pages/user-token/string';

const UserToken: FC = () => {
  const { user, totalItems, totalPages, isLoading, refetch } =
    useGetAccessTokenList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: user,
    columns: tokenColumns,
    pageCount: totalPages,
    actions: {},
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <TableToolbar
        table={table}
        title={UserTokenString.tokens_list}
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
