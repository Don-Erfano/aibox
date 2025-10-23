import { GpuSettingService } from './gpu-setting.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GpuSettingResponse } from '@/services/gpu/gpu-setting/interface';

const gpusSettingServices = new GpuSettingService();

const useGetSettingService = () =>
  useQuery<GpuSettingResponse>({
    queryKey: ['useGetSettingService'],
    queryFn: async () => {
      const res = await gpusSettingServices.getGpuSetting();
      return res.data.data;
    },
  });

const usePutGpuSetting = () =>
  useMutation({
    mutationFn: async ({ data }: { data: GpuSettingResponse }) => {
      const res = await gpusSettingServices.putGpuSetting(data);
      return res.data;
    },
  });
export { useGetSettingService, usePutGpuSetting };
