'use client';

import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import * as React from 'react';

export default function UsersPage() {
  const [users, setUsers] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const { table } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: Math.ceil(total / 10),
  });

  React.useEffect(() => {
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
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      <TableToolbar
        table={table}
        tableName=""
        chipNumber={2}
        search
        showSearchIcon
      />
      <DataTable table={table} />
    </div>
  );
}
