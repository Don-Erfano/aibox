'use client';

import { FC, useMemo } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import {
  IUser,
  IGetUserListRequestPayload,
} from '@/services/user/user-lists/interface';
import { useGetUserList } from '@/services/user/user-lists';
import { useSearchParams } from 'next/navigation';
import userColumns from '@/components/Template/user-list-template/constant';

const UserListTemplate: FC = () => {
  const searchParams = useSearchParams();
  const initialPageSize = Number(searchParams.get('page_size') ?? '10');
  const {
    table,
    activeFilterChips,
    filterCount,
    removeFilter,
    resetFilters,
    submitFilters,
  } = useDataTable({
    data: [] as IUser[],
    columns: userColumns,
    pageCount: 1,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
  });
  const { pageIndex, pageSize } = table.getState().pagination;
  const params: IGetUserListRequestPayload = useMemo(
    () => ({
      page: pageIndex + 1,
      page_size: pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { users, total, page: pageCount, isLoading } = useGetUserList(params);

  table.setOptions((opts) => ({
    ...opts,
    data: users,
    pageCount,
  }));

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <div className="flex items-center mb-2 justify-center w-25">
        <h3>کاربران</h3>
        <div className="h-8 w-8 mr-2 rounded-full bg-slate-950 text-center">
          <p className="w-full text-sm mt-1.5 text-white">{total}</p>
        </div>
      </div>

      <TableToolbar
        table={table}
        tableName="کاربران"
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

export default UserListTemplate;
