'use client';

import { FC, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useDataTable,
  DataTable,
  TableToolbar,
  DataTableSkeleton,
  Button,
  Form,
  ToggleGroup,
  RHFInput,
  Modal,
  toast,
} from '@aibox/ui';
import {
  useGetTransactionListByUser,
  useUpdateTransaction,
} from '@/services/transactions/transaction/transaction.hook';
import transactionColumns, {
  kindToggleItems,
  statusToggleItems,
} from './constant';
import { DetailCard } from '@/components/cards/detail-card';
import { FabButton } from '@/components/fab-button';
import type { Transaction } from '@/services/transactions/transaction/interface';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { transactionFormSchema } from '@/components/pages/user/user-transaction/schema';
import { TransactionString } from '@/components/pages/user/user-transaction/string';

type FormValues = z.infer<typeof transactionFormSchema>;
const UserTransactionPage: FC<{ userId: string }> = ({ userId }) => {
  const {
    transactions,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
    earnAmount,
    withdrawAmount,
    remainCharge,
  } = useGetTransactionListByUser(userId);

  const updateMutation = useUpdateTransaction();

  const form = useForm<FormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      status: 'done',
      kind: 'withdraw',
      track_id: '',
      description: '',
    },
  });
  const { reset, control, handleSubmit } = form;

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openCreateModal = (tx: Transaction, defaultStatus: 'done' | 'fail') => {
    setSelectedTx(tx);
    reset({
      status: defaultStatus,
      kind: 'withdraw',
      track_id: '',
      description: '',
    });
    setIsCreateModalOpen(true);
  };
  const openApprove = (tx: Transaction) => openCreateModal(tx, 'done');
  const openReject = (tx: Transaction) => openCreateModal(tx, 'fail');

  const openEdit = (tx: Transaction) => {
    setSelectedTx(tx);
    reset({
      status: tx.status as 'done' | 'fail',
      kind: tx.kind as 'withdraw' | 'deposit',
      track_id: tx.track_id,
      description: tx.description,
    });
    setIsEditModalOpen(true);
  };

  const onSubmitCreate = (data: FormValues) => {
    if (!selectedTx) return;
    updateMutation.mutate(
      { transaction_id: selectedTx.id, data },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          refetch();
        },
        onError: (err: any) => {
          const errorMsg = err.response?.data?.error;
          toast.error(errorMsg);
        },
      }
    );
  };

  const onSubmitEdit = (data: FormValues) => {
    if (!selectedTx) return;
    updateMutation.mutate(
      { transaction_id: selectedTx.id, data },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          refetch();
        },
        onError: (err: any) => {
          const errorMsg = err.response?.data?.error;
          toast.error(errorMsg);
        },
      }
    );
  };

  const columnsWithActions = useMemo(() => {
    return [
      ...transactionColumns,
      {
        id: 'actions',
        header: 'عملیات',
        cell: ({ row }) => {
          const tx = row.original as Transaction;
          const statusLabel = row.getValue('status') as string;
          const kindLabel = row.getValue('kind') as string;
          const titleLabel = row.getValue('title') as string;
          if (
            statusLabel === 'in_progress' &&
            kindLabel === 'withdraw' &&
            titleLabel === 'withdraw'
          ) {
            return (
              <div className="flex items-center justify-center space-x-2 ">
                <button onClick={() => openReject(tx)}>
                  <CircleX className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => openApprove(tx)}>
                  <CircleCheckBig
                    className="w-[22px] h-[22px]"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            );
          }
          return null;
        },
        meta: { label: 'عملیات' },
        enableColumnFilter: false,
        maxSize: 90,
      },
    ] as typeof transactionColumns & { id: string }[];
  }, [openEdit, openReject, openApprove]);

  const { table, filterCount, submitFilters, resetFilters } = useDataTable({
    data: transactions,
    columns: columnsWithActions,
    pageCount: totalPages,
    enableExpand: true,
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={columnsWithActions.length} />;
  }

  return (
    <>
      <div className="min-h-screen p-4">
        <div className="flex flex-col md:flex-row gap-x-9 gap-y-6 items-center justify-center mb-8">
          <DetailCard
            title={TransactionString.earned}
            credit={earnAmount}
            label={TransactionString.toman}
          />
          <DetailCard
            title={TransactionString.withdraw_amount}
            credit={withdrawAmount}
            label={TransactionString.toman}
          />
          <DetailCard
            title={TransactionString.remain_charge}
            credit={remainCharge}
            label={TransactionString.toman}
          />
        </div>

        <TableToolbar
          title="تراکنش‌ها"
          totalItems={totalItems}
          table={table}
          filterCount={filterCount}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          refreshLoading={isFetching}
          refetch={refetch}
          noManageColumns
        />

        <DataTable
          table={table}
          childComponent={({ row }) => {
            const lines = row.explication ?? [];
            return (
              <div className="px-4 py-4 space-y-2">
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm font-normal ${
                      i === 0 ? 'text-slate-950' : 'text-zinc-600'
                    }`}
                  >
                    {line.trim()}
                  </p>
                ))}
              </div>
            );
          }}
        />

        <FabButton onClick={() => console.log('add transaction')} />
      </div>

      <Modal
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsCreateModalOpen(false);
        }}
        title={TransactionString.submit_transaction}
      >
        <Form {...form}>
          <form
            key={`${selectedTx?.id}-create`}
            onSubmit={handleSubmit(onSubmitCreate)}
            className="space-y-6 px-4 sm:px-6 pb-6"
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex justify-between">
                  <p className="text-sm text-zinc-600 font-normal">
                    {TransactionString.transaction_status}
                  </p>
                  <ToggleGroup
                    items={statusToggleItems}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </div>
              )}
            />

            <Controller
              name="kind"
              control={control}
              render={({ field }) => (
                <div className="flex justify-between">
                  <p className="text-sm text-zinc-600 font-normal">
                    {TransactionString.transaction_kind}
                  </p>
                  <ToggleGroup
                    items={kindToggleItems}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  />
                </div>
              )}
            />

            <RHFInput
              name="track_id"
              control={control}
              label={TransactionString.transaction_id}
            />

            <RHFInput
              name="description"
              control={control}
              label={TransactionString.description}
              type="textarea"
            />

            <div className="flex justify-center items-center space-x-5 pt-4">
              <Button
                variant="default"
                size="lg"
                isFilled
                type="submit"
                title={TransactionString.submit}
              />
              <Button
                variant="default"
                size="lg"
                title={TransactionString.cancel}
                onClick={() => setIsCreateModalOpen(false)}
              />
            </div>
          </form>
        </Form>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsEditModalOpen(false);
        }}
        title={TransactionString.edit}
      >
        <Form {...form}>
          <form
            key={`${selectedTx?.id}-edit`}
            onSubmit={handleSubmit(onSubmitEdit)}
            className="space-y-6 px-4 sm:px-6 pb-6"
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex justify-between">
                  <p className="text-sm text-zinc-600 font-normal">
                    {TransactionString.transaction_status}
                  </p>
                  <ToggleGroup
                    items={statusToggleItems}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val as any)}
                  />
                </div>
              )}
            />

            <Controller
              name="kind"
              control={control}
              render={({ field }) => (
                <div className="flex justify-between">
                  <p className="text-sm text-zinc-600 font-normal">
                    {TransactionString.transaction_kind}
                  </p>
                  <ToggleGroup
                    items={kindToggleItems}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val as any)}
                  />
                </div>
              )}
            />

            <RHFInput
              name="track_id"
              control={control}
              label={TransactionString.transaction_id}
            />

            <RHFInput
              name="description"
              control={control}
              label={TransactionString.description}
              type="textarea"
            />

            <div className="flex justify-center items-center space-x-5 pt-4">
              <Button
                variant="default"
                size="lg"
                isFilled
                type="submit"
                title={TransactionString.edit}
              />

              <Button
                variant="default"
                size="lg"
                title={TransactionString.cancel}
                onClick={() => setIsEditModalOpen(false)}
              />
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default UserTransactionPage;
