'use client';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { FabButton } from '@/components/fab-button';
import { useGetAllGiftCodes } from '@/services/gift-code';

import { giftCodeColumns } from './constants';

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
        title={strings.giftCode}
        totalItems={totalItems}
      />

      <DataTable table={table} />

      <FabButton onClick={() => console.log('add')} />
    </>
  );
};

export default GiftCodeTable;
