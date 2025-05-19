'use client';

import { User } from '@/constant/data';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

const userColumns: ColumnDef<User>[] = [
  { header: 'ID', accessorKey: 'id', enableColumnFilter: false, id: 'id' },
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
    enableColumnFilter: true,
    meta: { label: 'Name', variant: 'text' },
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    enableColumnFilter: true,
    meta: { label: 'Email', variant: 'text' },
  },
  {
    header: 'Role',
    accessorKey: 'role',
    meta: {
      label: 'Role',
      options: [
        { label: 'admin', value: '1' },
        { label: 'user', value: '2' },
      ],
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    meta: {
      label: 'Status',
      options: [
        { label: 'active', value: '1' },
        { label: 'disable', value: '0' },
      ],
    },
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

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
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
        title="کاربران"
        totalItems={total}
        table={table}
        resetFilters={resetFilters}
        submitFilters={submitFilters}
        filterCount={filterCount}
        refreshLoading={false}
        viewModeButtons
      />
      <DataTable table={table} />
    </div>
  );
}
