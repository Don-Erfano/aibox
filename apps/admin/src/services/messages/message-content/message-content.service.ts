import {
  INotifMessageData,
  ICreateNotifMessageResponse,
  ICreateNotifMessage,
  IDeleteNotifMessageResponse,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

export default class NotifMessageService extends AbstractAPI {
  constructor() {
    super('v1/admin/mass_notification/message');
  }

  public async getNotifMessages(): Promise<
    AxiosResponse<INetworkResponse<INotifMessageData>>
  > {
    return this.http.request<INetworkResponse<INotifMessageData>>({
      method: 'GET',
      url: `${this.url}/`,
    });
  }
  public async getNotifMessageById(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<ICreateNotifMessageResponse>>> {
    return this.http.request<INetworkResponse<ICreateNotifMessageResponse>>({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }
  public async createNotifMessage(
    data: ICreateNotifMessage
  ): Promise<AxiosResponse<INetworkResponse<ICreateNotifMessageResponse>>> {
    return this.http.request<INetworkResponse<ICreateNotifMessageResponse>>({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }
  public async updateNotifMessage(
    id: string,
    data: ICreateNotifMessage
  ): Promise<AxiosResponse<INetworkResponse<ICreateNotifMessageResponse>>> {
    return this.http.request<INetworkResponse<ICreateNotifMessageResponse>>({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data,
    });
  }
  public async deleteNotifMessage(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<IDeleteNotifMessageResponse>>> {
    return this.http.request<INetworkResponse<IDeleteNotifMessageResponse>>({
      method: 'DELETE',
      url: `${this.url}/${id}/`,
    });
  }
}
