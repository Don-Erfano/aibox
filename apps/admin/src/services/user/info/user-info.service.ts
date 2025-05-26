import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
  IUpdateUserInfoRequest,
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

  public async UpdateUserInfo({
    id,
    ...body
  }: IUpdateUserInfoRequest): Promise<
    AxiosResponse<INetworkResponse<IGetUserInfoResponsePayload>>
  > {
    console.log('body', body);
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
      data: body,
    });
  }
}
