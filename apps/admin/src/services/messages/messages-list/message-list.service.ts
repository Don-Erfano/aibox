import {
  ICreateMassNotificationRequestPayload,
  ICreateMassNotificationResponsePayload,
  IGetMassNotificationsRequestPayload,
  IGetMassNotificationsResponsePayload,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

export default class MassNotificationsService extends AbstractAPI {
  constructor() {
    super('v1/admin/mass_notification');
  }

  public async getMassNotifications(
    params: IGetMassNotificationsRequestPayload = {}
  ): Promise<
    AxiosResponse<INetworkResponse<IGetMassNotificationsResponsePayload>>
  > {
    return this.http.request<
      INetworkResponse<IGetMassNotificationsResponsePayload>
    >({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
  public async createMassNotification(
    payload: ICreateMassNotificationRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<ICreateMassNotificationResponsePayload>>
  > {
    return this.http.request<
      INetworkResponse<ICreateMassNotificationResponsePayload>
    >({
      method: 'POST',
      url: `${this.url}/`,
      data: payload,
    });
  }
}
