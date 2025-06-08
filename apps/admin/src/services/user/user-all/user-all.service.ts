import {
  IGetAllUserListRequestPayload,
  IGetAllUserListResponsePayload,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

export default class UserAllListsService extends AbstractAPI {
  constructor() {
    super('v1/admin/user/all');
  }

  public async getAllUserList(
    params: IGetAllUserListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetAllUserListResponsePayload>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
