'use client';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

import { FabButton } from '@/components/fab-button';
import { useGetAllDepartments } from '@/services/department';
import { useGetFactors } from '@/services/factor';
import { useGetAllUsers } from '@/services/user/user-lists';

import { getFacotrColumns } from './constants';
import { DeleteFactorModal } from './delete-factor-modal';
import { FactorTableChild } from './factor-table-child';
import { DeleteModal } from './interface';
import { factorStrings } from './strings';
import { FINANCE_ROUTES } from '@/routes';

const FactorsTable: FC = () => {
  const router = useRouter();
  const { factors, totalPages, totalItems, refetch, isLoading, isFetching } =
    useGetFactors();

  const [deleteModalState, setDeleteModalState] = useState<DeleteModal>({
    show: false,
  });

  const { data: departments, isPending: isDepartmnetsPending } =
    useGetAllDepartments();
  const { data: users, isPending: isUsersPending } = useGetAllUsers();

  const usersData = users?.data.data.users.map((user) => ({
    label: user.email,
    value: user.id,
  }));
  const departmentsData = departments?.data.data.department.map(
    (department) => ({
      label: department.title,
      value: department.id,
    })
  );

  const factorColumns = useMemo(
    () => getFacotrColumns(usersData, departmentsData),
    [usersData, departmentsData]
  );

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: factors,
    columns: factorColumns,
    pageCount: totalPages,
    enableExpand: true,
    actions: {
      onEdit: (row) =>
        router.push(`${FINANCE_ROUTES.EDIT_FACTOR}/${row.id}`),
      onDelete: (row) => setDeleteModalState({ show: true, id: row.id }),
    },
  });

  if (isDepartmnetsPending || isUsersPending)
    return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <DeleteFactorModal
        modalState={deleteModalState}
        toggleModal={setDeleteModalState}
      />
      <TableToolbar
        table={table}
        refetch={refetch}
        filterCount={filterCount}
        resetFilters={resetFilters}
        submitFilters={submitFilters}
        refreshLoading={isLoading || isFetching}
        noManageColumns
        title={factorStrings.factors}
        totalItems={totalItems}
      />
      <DataTable table={table} childComponent={FactorTableChild} />
      <FabButton onClick={() => router.push(FINANCE_ROUTES.ADD_FACTORS)} />
    </>
  );
};

export default FactorsTable;
