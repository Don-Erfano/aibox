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

export const useGetIncome = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getIncome();
      return resp.data.data;
    },
    queryKey: [`useGetIncome`],
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

export const useGetPopularApis = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getPopularApis();
      return resp.data.data;
    },
    queryKey: [`useGetPopularApis`],
  });

export const useGetGpuUsers = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getGpuUsers();
      return resp.data.data;
    },
    queryKey: [`useGetGpuUsers`],
  });

export const useGetMostSellerApi = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getMostSellerApi();
      return resp.data.data;
    },
    queryKey: [`useGetMostSellerApi`],
  });

export const useGetTicketsCount = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getTicketsCount();
      return resp.data.data;
    },
    queryKey: [`useGetTicketsCount`],
  });

export const useGetApiPlatformData = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getApiPlatformData();
      return resp.data.data;
    },
    queryKey: [`useGetApiPlatformData`],
  });

export const useGetMostUseGpu = () =>
  useQuery({
    queryFn: async () => {
      const resp = await dashboardServices.getMostUseGpu();
      return resp.data.data;
    },
    queryKey: [`useGetMostUseGpu`],
  });
