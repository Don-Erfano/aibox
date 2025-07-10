import {
  ICreateMassNotificationRequest,
  ICreateMassNotificationResponse,
  IDeleteMassNotificationMessagePathParams,
  IDeleteMassNotificationMessageResponse,
  IGetMassNotificationCategoriesResponse,
  IGetMassNotificationsRequest,
  IGetMassNotificationsResponse,
  IGetMassNotificationStatusResponse,
  IUpdateMassNotificationMessageRequest,
  IUpdateMassNotificationRequest,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

export default class MassNotificationsService extends AbstractAPI {
  constructor() {
    super('v1/admin/mass_notification');
  }

  public async getMassNotifications(
    params: IGetMassNotificationsRequest = {}
  ): Promise<AxiosResponse<INetworkResponse<IGetMassNotificationsResponse>>> {
    return this.http.request<INetworkResponse<IGetMassNotificationsResponse>>({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }

  public async createMassNotification(
    payload: ICreateMassNotificationRequest
  ): Promise<AxiosResponse<INetworkResponse<ICreateMassNotificationResponse>>> {
    return this.http.request<INetworkResponse<ICreateMassNotificationResponse>>(
      {
        method: 'POST',
        url: `${this.url}/`,
        data: payload,
      }
    );
  }

  public async getMessageCategories(): Promise<
    AxiosResponse<INetworkResponse<IGetMassNotificationCategoriesResponse>>
  > {
    return this.http.request<
      INetworkResponse<IGetMassNotificationCategoriesResponse>
    >({
      method: 'GET',
      url: `${this.url}/message/category/`,
    });
  }

  public async updateMassNotificationMessage(
    id: string,
    payload: IUpdateMassNotificationMessageRequest
  ): Promise<AxiosResponse<INetworkResponse<ICreateMassNotificationResponse>>> {
    return this.http.request<INetworkResponse<ICreateMassNotificationResponse>>(
      {
        method: 'PUT',
        url: `${this.url}/${id}/`,
        data: payload,
      }
    );
  }

  public async deleteMassNotificationMessage(
    params: IDeleteMassNotificationMessagePathParams
  ): Promise<
    AxiosResponse<INetworkResponse<IDeleteMassNotificationMessageResponse>>
  > {
    return this.http.request<
      INetworkResponse<IDeleteMassNotificationMessageResponse>
    >({
      method: 'DELETE',
      url: `${this.url}/${params.id}/`,
    });
  }

  public async getMassNotificationStatus(): Promise<
    AxiosResponse<INetworkResponse<IGetMassNotificationStatusResponse>>
  > {
    return this.http.request<
      INetworkResponse<IGetMassNotificationStatusResponse>
    >({
      method: 'GET',
      url: `${this.url}/status/`,
    });
  }

  public async updateMassNotification(
    id: string,
    payload: IUpdateMassNotificationRequest
  ): Promise<AxiosResponse<INetworkResponse<unknown>>> {
    return this.http.request<INetworkResponse<unknown>>({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data: payload,
    });
  }
}
