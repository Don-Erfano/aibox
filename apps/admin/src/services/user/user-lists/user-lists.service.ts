import { AxiosResponse } from 'axios';
import {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class UserListsServices extends AbstractAPI {
  constructor() {
    super('v1/admin/user');
  }

  public async getUserList(
    params: IGetUserListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetUserListResponsePayload>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
