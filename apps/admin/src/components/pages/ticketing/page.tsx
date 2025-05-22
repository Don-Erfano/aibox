'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar, Button } from '@aibox/ui';
import { Plus } from 'lucide-react';
import ticketColumns from '@/components/pages/ticketing/constant';
import { useGetTicketList } from '@/services/ticketing/ticketing-list';
import { useRouter } from 'next/navigation';

const TicketingPage: FC = () => {
  const router = useRouter();
  const { tickets, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetTicketList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: tickets,
    columns: ticketColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => console.log('Edit ticket', row.id),
      onDelete: (row) => console.log('Delete ticket', row.id),
    },
  });

  const handleAddTicketing = () => {
    router.push('/dashboard/ticketing/add-ticket');
  };

  return (
    <div className="relative h-full">
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title="تیکت‌ها"
          totalItems={totalItems}
          table={table}
          refreshLoading={isLoading || isFetching}
          refetch={refetch}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <DataTable table={table} />
      </div>

      <Button
        onClick={handleAddTicketing}
        variant="ghost"
        className="absolute bottom-2 left-0 h-14 w-14 rounded-full bg-teal-600 shadow-2xl text-2xl cursor-pointer hover:bg-teal-700 "
      >
        <Plus strokeWidth={2.5} className="text-white size-6" />
      </Button>
    </div>
  );
};

export default TicketingPage;
