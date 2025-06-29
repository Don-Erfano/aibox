import { useGetApisLogs } from '@/services';
import { FC } from 'react';
import { logsColumn } from './constants';
import { DataTable, TableToolbar, useDataTable } from '@aibox/ui';
import { strings } from '@/constant';

const ApisLogs: FC = () => {
  const { data, isLoading, refetch } = useGetApisLogs();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: data?.data.data.data || [],
    columns: logsColumn,
    pageCount: data?.data.data.page_count || 0,
  });

  console.log(data);

  return (
    <div>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.reports}
          totalItems={data?.data.data.total_count || 0}
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
