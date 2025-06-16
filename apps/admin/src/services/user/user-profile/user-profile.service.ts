import { AxiosResponse } from 'axios';
import { IUserProfileResponsePayload } from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class UserProfileServices extends AbstractAPI {
  constructor() {
    super('v1/user/profile/');
  }

  public async getUserProfile(): Promise<
    AxiosResponse<INetworkResponse<IUserProfileResponsePayload>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}`,
    });
  }
}
