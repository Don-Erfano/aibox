import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import type {
  IAPIMarketDataResponsePayload,
  IApiPlatformDataResponsePayload,
  IChartDataResponsePayload,
  IDashboardInfoResponsePayload,
  IGpuUsersResponsePayload,
  IIncomeResponsePayload,
  IMostSellerApiResponsePayload,
  IMostUseGpuResponsePayload,
  IPopularApiResponsePayload,
  ITicketApiResponsePayload,
  IUserCountResponsePayload,
} from './interface';

export class DashboardServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async getUserCount(): Promise<
    AxiosResponse<INetworkResponse<IUserCountResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: '/v1/admin/dashboard/user_count/',
    });
  }

  public async getIncome(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<IIncomeResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/transaction/dashboard_income/?date_filter=${filter}`,
    });
  }

  public async getDashboardInfo(): Promise<
    AxiosResponse<INetworkResponse<IDashboardInfoResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: '/v1/admin/dashboard/',
    });
  }

  public async getChartData(
    filter: 'yearly' | 'monthly' | 'weekly'
  ): Promise<AxiosResponse<INetworkResponse<IChartDataResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/user/chart/?date_filter=${filter}`,
    });
  }

  public async getApiMarketData(): Promise<
    AxiosResponse<INetworkResponse<IAPIMarketDataResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/api_market/`,
    });
  }

  public async getPopularApis(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<IPopularApiResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/best_request_api/?date_filter=${filter}`,
    });
  }

  public async getGpuUsers(): Promise<
    AxiosResponse<INetworkResponse<IGpuUsersResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/resource_management/users_count/`,
    });
  }

  public async getMostSellerApi(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<IMostSellerApiResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/best_seller_api/?date_filter=${filter}`,
    });
  }

  public async getTicketsCount(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<ITicketApiResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ticketing/count/?date_filter=${filter}`,
    });
  }

  public async getApiPlatformData(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<IApiPlatformDataResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/api_platform/?date_filter=${filter}`,
    });
  }

  public async getMostUseGpu(
    filter: string
  ): Promise<AxiosResponse<INetworkResponse<IMostUseGpuResponsePayload>>> {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/resource_package/popular_packages/?date_filter=${filter}`,
    });
  }
}
