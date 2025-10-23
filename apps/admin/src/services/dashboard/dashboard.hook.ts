import { useQuery } from '@tanstack/react-query';

import { DashboardServices } from './dashboard.service';

const dashboardServices = new DashboardServices();

export const useGetUserCount = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getUserCount();
      return resp.data;
    },
    queryKey: [`useGetUserCount`],
  });

export const useGetIncome = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getIncome(filter);
      if (resp.data.code === 'SUCCESS') {
        const entries = resp.data.data?.earn_data.entries();
        let incomeData: { [key: string]: string | number } = {
          growth_rate: resp.data.data.growth_rate,
          remain_charge: resp.data.data?.remain_charge || 0,
          total_income: resp.data.data?.total_earn || 0,
        };

        for (const [, income] of entries) {
          incomeData = {
            ...incomeData,
            [income.title]: income.income || 0,
          };
        }
        return incomeData;
      }
    },
    queryKey: [`useGetIncome`, filter],
  });

export const useGetDashboardInfo = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getDashboardInfo();
      return resp.data.data;
    },
    queryKey: [`useGetDashboardInfo`],
  });

export const useGetChartData = (filter: 'yearly' | 'monthly' | 'weekly') =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getChartData(filter);
      return resp.data.data;
    },
    queryKey: [`useGetChartData`],
  });

export const useGetApiMarketData = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getApiMarketData();
      return resp.data.data;
    },
    queryKey: [`useGetApiMarketData`],
  });

export const useGetPopularApis = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getPopularApis(filter);
      return resp.data.data;
    },
    queryKey: [`useGetPopularApis`, filter],
  });

export const useGetGpuUsers = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getGpuUsers();
      return resp.data.data;
    },
    queryKey: [`useGetGpuUsers`],
  });

export const useGetMostSellerApi = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getMostSellerApi(filter);
      return resp.data.data;
    },
    queryKey: [`useGetMostSellerApi`, filter],
  });

export const useGetTicketsCount = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getTicketsCount(filter);
      return resp.data.data;
    },
    queryKey: [`useGetTicketsCount`, filter],
  });

export const useGetApiPlatformData = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getApiPlatformData(filter);
      return resp.data.data;
    },
    queryKey: [`useGetApiPlatformData`, filter],
  });

export const useGetMostUseGpu = (filter: string) =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getMostUseGpu(filter);
      return resp.data.data;
    },
    queryKey: [`useGetMostUseGpu`, filter],
  });
