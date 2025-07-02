'use client';
import React, { useState } from 'react';
import newsColumns from './constant';
import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { strings } from '@/constant';
import { useRouter } from 'next/navigation';
import { NEWS_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import { useGetNewsList } from '@/services/news';
import { DeleteModal } from './components/interface';
import { DeleteNewsModal } from './components/delete-modal';

const News = () => {
  const router = useRouter();
  const { news, isLoading, totalItems, totalPages, refetch } = useGetNewsList();
  const [deleteModalState, setDeleteModalState] = useState<DeleteModal>({
    show: false,
    id: 0,
  });

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: news,
    columns: newsColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => router.push(`${NEWS_ROUTES.EDIT}/${row.id}`),
      onDelete: (row) => setDeleteModalState({ show: true, id: row.id }),
    },
  });

  const handleAddNews = () => {
    router.push(NEWS_ROUTES.ADD);
  };

  if (isLoading) return <DataTableSkeleton columnCount={4} />;

  return (
    <>
      <div className="relative shadow-2xl px-11 py-5 rounded-sm">
        <DeleteNewsModal
          modalState={deleteModalState}
          toggleModal={setDeleteModalState}
        />
        <TableToolbar
          title={strings.news}
          totalItems={totalItems}
          table={table}
          refetch={refetch}
          refreshLoading={isLoading}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />
        <DataTable table={table} />
      </div>

      <FabButton onClick={handleAddNews} />
    </>
  );
};

export default News;
