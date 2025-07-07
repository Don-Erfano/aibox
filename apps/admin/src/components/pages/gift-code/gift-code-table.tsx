'use client';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { strings } from '@/constant';
import { FabButton } from '@/components/fab-button';
import { FINANCE_ROUTES } from '@/routes';
import { useGetAllGiftCodes } from '@/services/gift-code';

import { giftCodeColumns } from './constants';
import { DeleteGiftCodeModal } from './delete-gift-code-modal';
import { DeleteModal } from './interface';

const GiftCodeTable: React.FC = () => {
  const router = useRouter();
  const { giftCodes, isLoading, isFetching, refetch, totalItems, totalPages } =
    useGetAllGiftCodes();

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({ show: false });

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: giftCodes,
    columns: giftCodeColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) =>
        router.push(`${FINANCE_ROUTES.EDIT_GIFT_CODE}/${row.id}`),
      onDelete: (row) => setDeleteModal({ show: true, id: row.id }),
    },
  });

  if (isLoading) return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <DeleteGiftCodeModal
        modalState={deleteModal}
        toggleModal={setDeleteModal}
      />
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

      <FabButton onClick={() => router.push(FINANCE_ROUTES.ADD_GIFT_CODE)} />
    </>
  );
};

export default GiftCodeTable;
