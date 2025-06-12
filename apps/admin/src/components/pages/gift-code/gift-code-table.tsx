'use client';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { FabButton } from '@/components/fab-button';
import { useGetAllGiftCodes } from '@/services/gift-code';

import { giftCodeColumns } from './constants';
import { giftCodeStrings } from './strings';

const GiftCodeTable: React.FC = () => {
  const { giftCodes, isLoading, isFetching, refetch, totalItems, totalPages } =
    useGetAllGiftCodes();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: giftCodes,
    columns: giftCodeColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => console.log(row.id),
      onDelete: (row) => console.log(row.id),
    },
  });

  if (isLoading) return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <TableToolbar
        table={table}
        refetch={refetch}
        filterCount={filterCount}
        resetFilters={resetFilters}
        submitFilters={submitFilters}
        refreshLoading={isLoading || isFetching}
        noManageColumns
        title={giftCodeStrings.giftCode}
        totalItems={totalItems}
      />

      <DataTable table={table} />

      <FabButton onClick={() => console.log('add')} />
    </>
  );
};

export default GiftCodeTable;
