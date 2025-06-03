import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';
import type {
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
} from './interface';

export default class UserInfoServices extends AbstractAPI {
  constructor() {
    super('v1/admin/user');
  }

  public async getUserInfo({
    id,
  }: IGetUserInfoRequestPayload): Promise<
    AxiosResponse<INetworkResponse<IGetUserInfoResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }
}
