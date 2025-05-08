'use client';

import { User } from '@/constant/data';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import { useEffect, useState } from 'react';

const userColumns = [
  { header: 'ID', accessorKey: 'id', enableColumnFilter: false },
  { header: 'Name', accessorKey: 'name', meta: { label: 'Name' } },
  { header: 'Email', accessorKey: 'email', meta: { label: 'Email' } },
  {
    header: 'Role',
    accessorKey: 'role',
    meta: { label: 'Role', options: ['admin', 'editor', 'viewer'] },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    meta: { label: 'Status', options: ['active', 'inactive', 'pending'] },
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    meta: { label: 'Created At' },
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const {
    table,
    activeFilterChips,
    filterCount,
    removeFilter,
    resetFilters,
    submitFilters,
  } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: Math.ceil(total / 10),
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/users?pageNo=${
          table.getState().pagination.pageIndex + 1
        }&pageSize=${table.getState().pagination.pageSize}`
      );
      const json = await response.json();
      setUsers(json.data);
      setTotal(json.total);
    };
    fetchData();
  }, [table]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <TableToolbar
        table={table}
        tableName={'کاربران'}
        refreshLoading={false}
        totalItems={total}
        submitFilters={submitFilters}
        activeFilterChips={activeFilterChips}
        filterCount={filterCount}
        removeFilter={removeFilter}
        resetFilters={resetFilters}
      />

      <DataTable table={table} />
    </div>
  );
}
