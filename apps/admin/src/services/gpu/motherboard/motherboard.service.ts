import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import {
  IGetMotherboardResponsePayload,
  IGetMotherboardsListRequestPayload,
} from './interface';

export class MotherboardServices extends AbstractAPI {
  constructor() {
    super('v1/admin/resource_package/motherboard');
  }

  public async getmotherboardsList(
    params?: IGetMotherboardsListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetMotherboardResponsePayload>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }

  public async deleteMotherboard(
    id?: string
  ): Promise<AxiosResponse<INetworkResponse<any>>> {
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url}/${id}/`,
    });
  }

  public async getMotherboardInfo(id?: string) {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }

  public async putMotherboard(data: any, id: string) {
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data,
    });
  }

  public async postMotherboard(data: any) {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }
}
