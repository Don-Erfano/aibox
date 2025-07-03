import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useQueryParams } from '@/hooks/useQueryParams';
import TransactionService from './transaction.service';
import {
  AdminTransactionListParams,
  Transaction,
  UpdateTransactionResponse,
  UpdateTransactionRequest,
  TransactionListResponse,
} from './interface';
import { toast } from '@aibox/ui';

const transactionService = new TransactionService();

export const useGetTransactions = (userId?: string) => {
  const raw = useQueryParams();
  const query: AdminTransactionListParams = {
    ...(raw as AdminTransactionListParams),
    ...(userId ? { user: userId } : {}),
  };

  let totalItems = 0;
  let totalPages = 0;
  let earnAmount = 0;
  let withdrawAmount = 0;
  let remainCharge = 0;

  const {
    data: transactions = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<TransactionListResponse, Error, Transaction[]>({
    queryKey: ['txList', query],
    queryFn: async ({ queryKey }) => {
      const { page: rawPage, ...rest } =
        queryKey[1] as AdminTransactionListParams;
      const page = rawPage ?? 1;

      const params: AdminTransactionListParams = {
        page,
        page_size: rest.page_size ?? 10,
        ...rest,
      };

      const res = await transactionService.getTransactionList(params);

      return res.data.data;
    },
    select: (payload) => {
      totalItems = payload.total_count;
      totalPages = payload.page_count;
      earnAmount = payload.earn_amount;
      withdrawAmount = payload.withdraw_amount;
      remainCharge = payload.remain_charge;
      return payload.transactions;
    },
    placeholderData: keepPreviousData,
  });

  return {
    transactions,
    totalItems,
    totalPages,
    earnAmount,
    withdrawAmount,
    remainCharge,
    isLoading,
    isFetching,
    refetch,
  };
};

export function useUpdateTransaction(isEdit?: boolean) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTransactionResponse,
    Error,
    { transaction_id: string; data: UpdateTransactionRequest }
  >({
    mutationFn: ({ transaction_id, data }) =>
      transactionService
        .updateTransaction(transaction_id, data)
        .then((res) => res.data),

    onSuccess: ({ data }) => {
      const { status } = data.transactions;

      queryClient.invalidateQueries({
        queryKey: ['txList'],
      });

      if (isEdit) {
        toast.success('ویرایش تراکنش با موفقیت انجام شد.');
        return;
      }

      if (status === 'done')
        toast.success('ثبت تراکنش با وضعیت «موفق» با موفقیت انجام شد.');
      else if (status === 'fail')
        toast.success('ثبت تراکنش با وضعیت «ناموفق» با موفقیت انجام شد.');
    },
  });
}
