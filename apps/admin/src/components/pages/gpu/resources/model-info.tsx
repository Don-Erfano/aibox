'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { modelCol } from './constants';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import { FormContainer } from '@/components/templates';

const ModelInfo: FC = () => {
  const { push } = useRouter();
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
        refetch={() => false}
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
