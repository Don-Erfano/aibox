import { AxiosResponse } from 'axios';
import {
  IAddUserRequestPayload,
  IAddUserResponsePayload,
  IGetAllUsers,
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

  public async addUser(
    data: IAddUserRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IAddUserResponsePayload>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }

  public async getAllUsers(): Promise<
    AxiosResponse<INetworkResponse<IGetAllUsers>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/all/`,
    });
  }
}
