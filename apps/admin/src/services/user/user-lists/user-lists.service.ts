import { AxiosResponse } from 'axios';
import {
  IAddUserRequestPayload,
  IAddUserResponsePayload,
  IGetAllUsers,
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
  IPutUser,
  IUser,
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

  public async getUser(
    userId: string
  ): Promise<AxiosResponse<INetworkResponse<IUser>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/${userId}/`,
    });
  }

  public async postActivateEmail(
    email: string
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return this.http.request({
      method: 'POST',
      url: 'v1/user/register/resend_activate_email/',
      data: { email },
    });
  }

  public async putUserById(
    data: IPutUser
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    const formData = new FormData();

    Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, val]) => {
        formData.append(key, val);
      });

    return this.http.request({
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `${this.url}/${data.id}/`,
      data: formData,
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
