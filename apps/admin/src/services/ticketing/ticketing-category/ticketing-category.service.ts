import { AxiosResponse } from 'axios';
import {
  IGetTicketingCategoryRequestPayload,
  IGetTicketingCategoryResponsePayload,
  IGetUserApisResponsePayload,
  IUpdateTicketingCategoryRequestPayload,
  IUpdateTicketingCategoryResponsePayload,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class TicketingCategoryService extends AbstractAPI {
  constructor() {
    super('v1/admin/ticketing/category');
  }

  public async getCategoryList(
    params: IGetTicketingCategoryRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<IGetTicketingCategoryResponsePayload>>
  > {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }

  public async fetchUserApis(
    url: string
  ): Promise<AxiosResponse<INetworkResponse<IGetUserApisResponsePayload>>> {
    return this.http.request({
      method: 'GET',
      url,
    });
  }

  public async updateCategory(
    id: string,
    data: IUpdateTicketingCategoryRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<IUpdateTicketingCategoryResponsePayload>>
  > {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data,
    });
  }
}
