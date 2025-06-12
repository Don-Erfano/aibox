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
  TransactionListResponse,
  Transaction,
  UpdateTransactionResponse,
  UpdateTransactionRequest,
} from './interface';

const transactionService = new TransactionService();

export function useGetTransactionListByUser(userId: string) {
  const raw = useQueryParams();
  const query: AdminTransactionListParams = {
    ...(raw as AdminTransactionListParams),
    user: userId,
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
    queryFn: async () => {
      const { page: resize_page, ...rest } = query;
      const page = resize_page ?? 1;

      const params: AdminTransactionListParams = {
        page,
        page_size: rest.page_size ?? 10,
        ...rest,
      };

      const res = await transactionService.getTransactionList(params);
      return res.data;
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
}

export function useUpdateTransaction() {
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['txList'],
      });
    },
  });
}
