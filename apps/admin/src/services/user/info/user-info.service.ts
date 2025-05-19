import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
} from './interface';

export default class UserInfoServices extends AbstractAPI {
  constructor() {
    super('v1/admin/user');
  }

  public async getUserInfo(
    params: IGetUserInfoRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetUserInfoResponsePayload>>> {
    const { id } = params;

    if (!id) {
      throw new Error('User ID is required');
    }

    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }
}
