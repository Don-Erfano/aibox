import { FC } from 'react';

import { useGetUserApiPackage } from '@/services/user/info';
import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';
import { USERAPIPACKAGES } from './constant';
import { RowChild } from './row-child';

const ApiPackage: FC<{ id: string }> = ({ id }) => {
  const { data, isFetching, isLoading, refetch } = useGetUserApiPackage(id);

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: data?.data.data.list || [],
    enableExpand: true,
    columns: USERAPIPACKAGES,
    pageCount: data?.data.data.page_count || 0,
  });
  return (
    <>
      <TableToolbar
        title="لیست API ها"
        totalItems={data?.data.data.total_count || 0}
        table={table}
        refreshLoading={isLoading || isFetching}
        refetch={refetch}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />
      <DataTable table={table} childComponent={RowChild} />
    </>
  );
};

export default ApiPackage;
