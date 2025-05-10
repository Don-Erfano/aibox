'use client';

import { FC, useEffect, useState, useMemo } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import { useSearchParams } from 'next/navigation';
import tokenColumns from './constant';
import {
  IGetUserListRequestPayload,
  IUser,
} from '@/services/user/user-token/interface';
import { useGetUserAccessTokenList } from '@/services/user/user-token';

const UserTokenTemplate: FC = () => {
  const searchParams = useSearchParams();
  const initialPageSize = Number(searchParams.get('page_size') ?? '10');

  const [tokens, setTokens] = useState<IUser[]>([]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(
    () => Math.ceil(total / initialPageSize) || 1
  );

  const {
    table,
    activeFilterChips,
    filterCount,
    removeFilter,
    resetFilters,
    submitFilters,
  } = useDataTable({
    data: tokens,
    columns: tokenColumns,
    pageCount,
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  const params: IGetUserListRequestPayload = useMemo(
    () => ({
      page: pageIndex + 1,
      page_size: pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { data, isLoading } = useGetUserAccessTokenList(params);

  useEffect(() => {
    if (!data) return;
    setTokens(data.user);
    setTotal(data.total_count);
  }, [data]);

  useEffect(() => {
    setPageCount(pageSize > 0 ? Math.ceil(total / pageSize) : 1);
  }, [total, pageSize]);

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <div className="flex mb-2 ">
        <h3>توکن‌ها</h3>
        <div className="h-8 w-8 mr-2 rounded-full bg-slate-950 text-center">
          <p className="w-full text-sm mt-1.5 text-white">{total}</p>
        </div>
      </div>

      <TableToolbar
        table={table}
        tableName=" لیست توکن‌ها"
        refreshLoading={isLoading}
        totalItems={total}
        submitFilters={submitFilters}
        activeFilterChips={activeFilterChips}
        filterCount={filterCount}
        removeFilter={removeFilter}
        resetFilters={resetFilters}
      />

      <DataTable table={table} />
    </div>
  );
};

export default UserTokenTemplate;
