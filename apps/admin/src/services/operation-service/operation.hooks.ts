import { useQueryParams } from '@/hooks/useQueryParams';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  IDeploymentResponse,
  IDeploymentRequest,
  IDeploymentResult,
  IDeployPayload,
} from './interface';
import OperationService from './operation.service';
import { toast } from '@aibox/ui';

const operationService = new OperationService();

export const useDeploymentList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: servers = [],
    isLoading,
    refetch,
  } = useQuery<IDeploymentResponse, Error, IDeploymentResult[]>({
    queryKey: ['deploymentList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IDeploymentRequest;
      const queryParams: IDeploymentRequest = {
        page: page,
        page_size: 10,
        ...params,
      };
      const resp = await operationService.getDeployList(queryParams);
      return resp.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { servers, totalItems, totalPages, isLoading, refetch };
};

export const useDeployServer = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeploymentResult, Error, IDeployPayload>({
    mutationFn: (newUserPayload: IDeployPayload) =>
      operationService.deploy(newUserPayload).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deploymentList'] });
      toast.success('عملیات مورد نظر با موفقیت اجرا شد.');
    },
  });
};

export const useDeleteDeploy = () =>
  useMutation({
    mutationFn: (id: string) => operationService.stopDeploy(id),
    onSuccess: () => {
      toast.success('سرور مورد نظر با موفقیت خاموش شد.');
    },
    mutationKey: [`deleteDeployment`],
  });
