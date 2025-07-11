import { useGetApisLogs } from '@/services';
import { FC } from 'react';
import { logsColumn } from './constants';
import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';
import { strings } from '@/constant';

const ApisLogs: FC = () => {
  const { logs, isLoading, refetch, totalItems, totalPages } = useGetApisLogs();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: logs,
    columns: logsColumn,
    pageCount: totalPages,
  });

  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.reports}
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
    </div>
  );
};

export default ApisLogs;
