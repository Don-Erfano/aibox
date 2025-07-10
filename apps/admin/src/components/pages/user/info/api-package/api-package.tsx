import { FC } from 'react';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { useGetUserApiPackage } from '@/services/user/info';

import { RowChild } from './row-child';
import { USERAPIPACKAGES } from './constant';

const ApiPackage: FC<{ id: string }> = ({ id }) => {
  const { packages, totalItems, totalPages, isFetching, isLoading, refetch } =
    useGetUserApiPackage(id);

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: packages,
    enableExpand: true,
    columns: USERAPIPACKAGES,
    pageCount: totalPages,
  });
  return (
    <>
      <TableToolbar
        title={strings.apisList}
        totalItems={totalItems}
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
