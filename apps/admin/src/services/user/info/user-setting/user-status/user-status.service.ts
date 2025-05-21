import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  IUpdateUserStatusRequestPayload,
  IUpdateUserStatusResponsePayload,
} from './interface';

export default class UserStatusServices extends AbstractAPI {
  constructor() {
    super('v1/admin/wage_percentage'); // TODO: ADD API
  }
  public async getUserStatus(
    params: IUpdateUserStatusRequestPayload
  ): Promise<
    AxiosResponse<INetworkResponse<IUpdateUserStatusResponsePayload>>
  > {
    const { id } = params;

    if (!id) {
      throw new Error('User ID is required');
    }

    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
    });
  }
}
