'use client';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';
import { useRouter } from 'next/navigation';

import { FabButton } from '@/components/fab-button';
import { strings } from '@/constant';
import { AI_SERVICES_ROUTES } from '@/routes';

import {
  collectionColumns,
  collectionMockData,
  mockRefetch,
} from './constants';

export const CollectionTable = () => {
  const router = useRouter();

  const { table, resetFilters, submitFilters, filterCount } = useDataTable({
    data: collectionMockData,
    columns: collectionColumns,
    pageCount: 1,
    actions: {
      onEdit: (row) =>
        router.push(`${AI_SERVICES_ROUTES.EDIT_COLLECTION}/${row.id}`),
      onDelete: (row) => console.log(row.id),
    },
  });

  return (
    <>
      <TableToolbar
        table={table}
        title={strings.collections}
        totalItems={collectionMockData.length}
        refreshLoading={false}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
        refetch={mockRefetch}
      />
      <DataTable table={table} />
      <FabButton
        onClick={() => router.push(AI_SERVICES_ROUTES.ADD_COLLECTION)}
      />
    </>
  );
};
