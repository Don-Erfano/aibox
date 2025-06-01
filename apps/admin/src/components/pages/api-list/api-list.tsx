'use client';

import { FC, useState } from 'react';

import { DataTable, Modal, TableToolbar, useDataTable } from '@aibox/ui';

import userColumns from './constants';
import { useGetApiList } from '@/services';

const ApiList: FC = () => {
  const { apis, totalItems, totalPages, isLoading, refetch } = useGetApiList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: apis,
    columns: userColumns,
    pageCount: totalPages,
  });

  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title="لیست APIها"
          totalItems={totalItems}
          table={table}
          refreshLoading={isLoading}
          refetch={refetch}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <DataTable table={table} />
      </div>
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
        title="تخصیص تیکت"
      >
        <>children</>
      </Modal>
    </div>
  );
};

export default ApiList;
