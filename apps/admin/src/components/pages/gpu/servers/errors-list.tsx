'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { errorsCol } from './constants';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';

const Errorslist: FC = () => {
  const { push } = useRouter();
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: [
      {
        model: '3080',
        ram: '1401/12/27 13:30',
        coda_core: '',
        finishReserve: 'نام کاربر',
        error:
          'erroooooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      },
    ],
    columns: errorsCol,

    pageCount: 1,
  });
  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.errors}
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
      </div>
      <FabButton onClick={() => push(`${GPU_ROUTES.MOTHERBOARDS}/add`)} />
    </div>
  );
};
export default Errorslist;
