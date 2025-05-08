import {
  useQuery as useReactQuery,
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'onError' | 'onSuccess' | 'onSettled'
  >
): UseQueryResult<TData, TError> {
  return useReactQuery({
    queryKey,
    queryFn,
    ...options,
  });
}
