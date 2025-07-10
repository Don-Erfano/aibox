'use client';

import { FC } from 'react';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { modelCol } from './constants';
import { FormContainer } from '@/components/templates';

const ModelInfo: FC = () => {
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: [
      {
        nodeName: 'نام node',
        podName: 'نام pod',
        usage: '72%',
        status: 'آزاد',
      },
    ],
    columns: modelCol,

    pageCount: 1,
  });
  return (
    <FormContainer title="JUPIYTER - نام model">
      <TableToolbar
        title={strings.nodes}
        totalItems={0}
        table={table}
        refreshLoading={false}
        refetch={() => false as any}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />

      <DataTable table={table} />
    </FormContainer>
  );
};
export default ModelInfo;
