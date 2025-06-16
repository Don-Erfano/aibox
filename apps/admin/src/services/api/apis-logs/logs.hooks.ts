import { useQuery } from '@tanstack/react-query';
import ApisLogsServices from './logs.service';
import { useQueryParams } from '@/hooks/useQueryParams';

const logsServices = new ApisLogsServices();

export const useGetApisLogs = () => {
  const allQueryParams = useQueryParams();
  const data = useQuery({
    queryKey: [`useGetApisLogs`, allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as any;
      const queryParams: any = {
        page,
        ...params,
        page_size: page_size || 10,
      };
      const response = await logsServices.getApisLogs(queryParams);
      return response;
    },
  });
  return data;
};
