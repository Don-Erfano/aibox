'use client';
import React from 'react';
import newsColumns from './constant';
import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';
import { strings } from '@/constant';
import { useRouter } from 'next/navigation';
import { NEWS_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import { useGetNewsList } from '@/services/news';

const News = () => {
  const router = useRouter();
  const { news, isPending, totalItems, totalPages, refetch } = useGetNewsList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: news,
    columns: newsColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => router.push(`${NEWS_ROUTES.EDIT}/${row.id}`),
      onDelete: (row) => console.log(row.id),
    },
  });

  const handleAddNews = () => {
    router.push(NEWS_ROUTES.ADD);
  };

  return (
    <>
      <div className="relative shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.news}
          totalItems={totalItems}
          table={table}
          refetch={refetch}
          refreshLoading={isPending}
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
