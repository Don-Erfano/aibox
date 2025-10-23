import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  ApprovalReportParams,
  ApprovalReportResponse,
  GpuMotherboardResponse,
  IAddNewConfigurationRequestPayload,
  IConfigurationRequestPayload,
  IConfigurationResponsePayload,
  IMotherboardListResponsePayload,
} from './interface';

export class ConfigurationServices extends AbstractAPI {
  constructor() {
    super(`v1/admin/resource_package`);
  }

  public async getConfigurationList(
    params?: IConfigurationRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IConfigurationResponsePayload>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/gpu_motherboard/`,
      params: { ...params, page_size: 10 },
    });
  }

  public async getMotherboardList(): Promise<
    AxiosResponse<INetworkResponse<IMotherboardListResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/gpu_motherboard/motherboard/`,
    });
  }

  public async addNewConfiguration(
    data: IAddNewConfigurationRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/gpu_motherboard/`,
      data,
    });
  }

  public async editConfiguration(
    data: IAddNewConfigurationRequestPayload,
    id?: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/gpu_motherboard/${id}/`,
      data,
    });
  }

  public async getConfigurationData(id?: string) {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/gpu_motherboard/${id}/`,
    });
  }

  public async deleteConfiguration(id?: string) {
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url}/gpu_motherboard/${id}/`,
    });
  }

  public async approvePackage({
    id,
    data,
  }: ApprovalReportParams): Promise<
    AxiosResponse<INetworkResponse<ApprovalReportResponse>>
  > {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/report/${id}/approval/`,
      data,
    });
  }

  public async activatePackage(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/report/${id}/activate/`,
    });
  }

  public async getAllGpuMotherboards(): Promise<
    AxiosResponse<INetworkResponse<GpuMotherboardResponse>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/gpu_motherboard/all/`,
    });
  }
}
