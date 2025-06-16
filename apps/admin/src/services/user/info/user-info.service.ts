import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';
import type {
  IGetPackageUsageInfoResponsePayload,
  IGetUserApiPackageRequestPayload,
  IGetUserApiPackageResponsePayload,
  IGetUserGpuPckageResponsePayload,
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
  IUpdateUserInfoRequest,
} from './interface';

export default class UserInfoServices extends AbstractAPI {
  constructor() {
    super('v1/admin/user');
  }

  public async getUserInfo({
    id,
  }: IGetUserInfoRequestPayload): Promise<
    AxiosResponse<INetworkResponse<IGetUserInfoResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }

  public async UpdateUserInfo({
    id,
    ...body
  }: IUpdateUserInfoRequest): Promise<
    AxiosResponse<INetworkResponse<IGetUserInfoResponsePayload>>
  > {
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data: body,
    });
  }

  public async getUserApiPackages(
    id: string,
    params: IGetUserApiPackageRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<IGetUserApiPackageResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `v2/admin/api_package/user/?user=${id}`,
      params,
    });
  }
  public async getUserGpuPackages(
    id: string
  ): Promise<
    AxiosResponse<INetworkResponse<IGetUserGpuPckageResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `v1/admin/resource_package/user_package_info/${id}/`,
    });
  }

  public async getUserGpuPackageInfo(
    id: string
  ): Promise<
    AxiosResponse<INetworkResponse<IGetPackageUsageInfoResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `v1/admin/resource_management/servers_statistic/${id}/`,
    });
  }
}
