import {
  DataTable,
  DataTableActionBarAction,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { CircleCheckBig, CircleX, SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { FabButton } from '@/components/fab-button';
import { strings } from '@/constant';
import { FINANCE_ROUTES } from '@/routes';
import { useGetTransactions } from '@/services/transactions/transaction';
import { useGetAllUsers } from '@/services/user/user-lists';

import { getTransactionColumns } from './constants';
import { ModalState } from './interface';
import { TransactionChild } from './transaction-child';
import { TransactionFormModal } from './transaction-form-modal';

export const TransactionsTable = () => {
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
  });

  const router = useRouter();

  const { data: users, isPending: isUsersPending } = useGetAllUsers();

  const usersData = users?.data.data.users.map((user) => ({
    label: user.email,
    value: user.id,
  }));

  const {
    transactions,
    isLoading,
    isFetching,
    totalItems,
    totalPages,
    refetch,
  } = useGetTransactions();

  const transactionColumns = useMemo(
    () => getTransactionColumns({ userOptions: usersData }),
    [usersData]
  );

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: transactions,
    enableExpand: true,
    pageCount: totalPages,
    columns: [
      ...transactionColumns,
      {
        id: 'actions',
        header: strings.actions,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const { id, status, title, description, track_id } = row.original;

          if (title === 'withdraw') {
            return (
              <div className="flex items-center justify-center gap-2">
                {status === 'in_progress' && (
                  <>
                    <DataTableActionBarAction
                      tooltip={strings.successfulTransaction}
                      onClick={() =>
                        setModalState({
                          show: true,
                          isEdit: false,
                          transactionData: {
                            status: 'done',
                          },
                          id,
                        })
                      }
                    >
                      <CircleCheckBig strokeWidth={1.5} />
                    </DataTableActionBarAction>

                    <DataTableActionBarAction
                      tooltip={strings.failedTransaction}
                      onClick={() =>
                        setModalState({
                          show: true,
                          isEdit: false,
                          transactionData: {
                            status: 'fail',
                          },
                          id,
                        })
                      }
                    >
                      <CircleX strokeWidth={1.5} />
                    </DataTableActionBarAction>
                  </>
                )}

                {(status === 'done' || status === 'fail') && (
                  <DataTableActionBarAction
                    tooltip={strings.editTransaction}
                    onClick={() =>
                      setModalState({
                        show: true,
                        isEdit: true,
                        transactionData: {
                          status,
                          track_id,
                          description,
                        },
                        id,
                      })
                    }
                  >
                    <SquarePen strokeWidth={1.5} />
                  </DataTableActionBarAction>
                )}
              </div>
            );
          }
          return null;
        },
      },
    ],
  });

  if (isLoading || isUsersPending)
    return <DataTableSkeleton columnCount={10} />;

  return (
    <div>
      <TransactionFormModal
        modalState={modalState}
        toggleModal={setModalState}
      />
      <TableToolbar
        table={table}
        refetch={refetch}
        refreshLoading={isLoading || isFetching}
        noManageColumns
        title={strings.transactions}
        totalItems={totalItems}
        filterCount={filterCount}
        resetFilters={resetFilters}
        submitFilters={submitFilters}
      />

      <DataTable table={table} childComponent={TransactionChild} />

      <FabButton onClick={() => router.push(FINANCE_ROUTES.ADD_TRANSACTIONS)} />
    </div>
  );
};
