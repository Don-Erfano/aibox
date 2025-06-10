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

  public async getIncome(): Promise<
    AxiosResponse<INetworkResponse<IIncomeResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: '/v1/admin/transaction/dashboard_income/',
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

  public async getPopularApis(): Promise<
    AxiosResponse<INetworkResponse<IPopularApiResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/best_request_api/`,
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

  public async getMostSellerApi(): Promise<
    AxiosResponse<INetworkResponse<IMostSellerApiResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/best_seller_api/`,
    });
  }

  public async getTicketsCount(): Promise<
    AxiosResponse<INetworkResponse<ITicketApiResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ticketing/count/`,
    });
  }

  public async getApiPlatformData(): Promise<
    AxiosResponse<INetworkResponse<IApiPlatformDataResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/ai_dashboard/api_platform/`,
    });
  }

  public async getMostUseGpu(): Promise<
    AxiosResponse<INetworkResponse<IMostUseGpuResponsePayload>>
  > {
    return await this.http.request({
      method: `GET`,
      url: `/v1/admin/resource_package/popular_packages/`,
    });
  }
}
