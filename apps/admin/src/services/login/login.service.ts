import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import { ILogiPayload, ILogiResponse } from './interface';

export class AuthServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async postUserAuthLogin(
    data: ILogiPayload
  ): Promise<AxiosResponse<INetworkResponse<ILogiResponse>>> {
    return await this.http.request({
      method: `POST`,
      url: `v1/user/register/login/`,
      data,
    });
  }
}
