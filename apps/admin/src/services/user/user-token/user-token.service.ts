import { AxiosResponse } from 'axios';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';

export default class UserAccessTokenListService extends AbstractAPI {
  constructor() {
    super('v1/admin/user/access_token_list');
  }

  public async getAccessTokenList(
    params: IGetUserListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetUserListResponsePayload>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
