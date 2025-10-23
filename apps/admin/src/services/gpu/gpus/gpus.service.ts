import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import {
  IDeleteGpusResponsePayload,
  IGpu,
  IGpusListRequestPayload,
  IGpusListResponsePayload,
  IPostGpuRequestPayload,
} from './interface';

export class GpusServices extends AbstractAPI {
  constructor() {
    super(`/v1/admin/resource_package/gpu/`);
  }

  public async getGpusList(
    params?: IGpusListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGpusListResponsePayload>>> {
    return this.http.request({
      url: this.url,
      method: 'GET',
      params,
    });
  }

  public async deleteGpu(
    id?: string
  ): Promise<AxiosResponse<INetworkResponse<IDeleteGpusResponsePayload>>> {
    return this.http.request({
      url: `${this.url}${id}/`,
      method: 'DELETE',
    });
  }

  public async getGpuInfo(
    id?: string
  ): Promise<AxiosResponse<INetworkResponse<IGpu>>> {
    return this.http.request({
      url: `${this.url}${id}/`,
      method: 'GET',
    });
  }

  public async postGpu(
    data: IPostGpuRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: this.url,
      method: 'POST',
      data,
    });
  }

  public async putGpu(
    data: IPostGpuRequestPayload,
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `${this.url}${id}/`,
      method: 'PUT',
      data,
    });
  }
}
