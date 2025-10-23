import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import {
  IDiskResponsePayload,
  IGetLogsListRequestPayload,
  IGetLogsListResponsePayload,
  IGetPackageByIdResponsePayload,
  IPlanResponsePayload,
  IUpdatePackageRequestPayload,
} from './interface';

export class GpuLogsService extends AbstractAPI {
  constructor() {
    super(``);
  }

  public async getGpuLogsList(
    params: IGetLogsListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetLogsListResponsePayload>>> {
    return this.http.request({
      url: 'v1/admin/resource_package/report/',
      method: 'GET',
      params,
    });
  }

  public async getGpuPackageById(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<IGetPackageByIdResponsePayload>>> {
    return this.http.request({
      url: `v1/admin/resource_package/report/${id}/`,
      method: 'GET',
    });
  }

  public async updateUserPackage({
    id,
    data,
  }: {
    id: string;
    data: IUpdatePackageRequestPayload;
  }): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `v1/admin/resource_package/report/${id}/`,
      method: 'PUT',
      data,
    });
  }

  public async getPlansList(): Promise<
    AxiosResponse<INetworkResponse<IPlanResponsePayload>>
  > {
    return this.http.request({
      url: 'v1/admin/resource_package/plan/',
      method: 'GET',
    });
  }

  public async getDisksList(): Promise<
    AxiosResponse<INetworkResponse<IDiskResponsePayload>>
  > {
    return this.http.request({
      url: 'v1/admin/resource_package/disk/',
      method: 'GET',
    });
  }

  public async deleteGpuLog(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `v1/admin/resource_package/report/${id}/`,
      method: 'Delete',
    });
  }

  public async getServerProfiles(): Promise<
    AxiosResponse<INetworkResponse<{ profiles: string[] }>>
  > {
    return this.http.request({
      url: 'v1/admin/resource_management/server_profiles/',
      method: 'GET',
    });
  }
}
