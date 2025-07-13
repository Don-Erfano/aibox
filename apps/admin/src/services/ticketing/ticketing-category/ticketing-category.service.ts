import { AxiosResponse } from 'axios';
import {
  IGetTicketingCategoryRequestPayload,
  IGetTicketingCategoryResponsePayload,
  IGetUserApisResponsePayload,
  IUpdateTicketingCategoryRequestPayload,
  IUpdateTicketingCategoryResponsePayload,
  ICreateTicketingCategoryRequestPayload,
  ICreateTicketingCategoryResponsePayload,
  IGetSingleTicketingCategoryResponsePayload,
  IDeleteTicketingCategoryResponsePayload,
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

  public async getSingleCategory(
    id: string
  ): Promise<
    AxiosResponse<INetworkResponse<IGetSingleTicketingCategoryResponsePayload>>
  > {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
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

  public async createCategory(
    data: ICreateTicketingCategoryRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<ICreateTicketingCategoryResponsePayload>>
  > {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }
  public async deleteCategory(
    id: string
  ): Promise<
    AxiosResponse<INetworkResponse<IDeleteTicketingCategoryResponsePayload>>
  > {
    return this.http.request({
      method: 'DELETE',
      url: `${this.url}/${id}/`,
    });
  }
}
