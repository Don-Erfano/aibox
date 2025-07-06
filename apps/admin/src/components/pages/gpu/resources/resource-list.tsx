'use client';

import { FC } from 'react';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { resourceCol } from './constants';
import { FormContainer } from '@/components/templates';

const ResourceList: FC = () => {
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: [
      {
        modelName: 'نام model',
        totalCount: '10',
        freeCount: '0',
        modelInfo:
          'Geforce GT 1030- 2G GPU RAM- 384 Cuda Cores- 8G RAM- 4 Cores CPU',
      },
    ],
    columns: resourceCol,

    pageCount: 1,
  });
  return (
    <FormContainer title="JUPIYTER">
      <TableToolbar
        title={strings.models}
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
export default ResourceList;
