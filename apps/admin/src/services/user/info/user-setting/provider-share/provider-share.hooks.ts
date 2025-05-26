import { useQuery } from '@tanstack/react-query';
import ProviderShareServices from './provider-share.service';
import { IProviderShareRequest } from './interface';

const providerShareService = new ProviderShareServices();

export const useGetProviderShare = ({ id }: IProviderShareRequest) => {
  const { data: providerShareData, isPending } = useQuery({
    queryKey: ['provider-share', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');
      const response = await providerShareService.getProviderShare({ id });
      return response.data.data;
    },
    enabled: !!id,
  });

  return { providerShareData, isPending };
};
