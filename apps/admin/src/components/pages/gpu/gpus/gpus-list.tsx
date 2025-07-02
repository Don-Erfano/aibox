import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';

import { strings } from '@/constant';
import { GpuCols } from './constants';
import * as data from './data.json';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';

const GpusList: FC = () => {
  const { push } = useRouter();
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: data,
    columns: GpuCols,
    enableRowSelection: true,
    actions: {
      onDelete: (r) => console.log(r),
      onEdit: (r) => push(`${GPU_ROUTES.GPUS}/edit?id=${r.id}`),
    },
    pageCount: 1,
  });
  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.gpus}
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
      <FabButton onClick={() => push(`${GPU_ROUTES.GPUS}/add`)} />
    </div>
  );
};
export default GpusList;
