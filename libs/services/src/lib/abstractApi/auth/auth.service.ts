import { AxiosResponse } from 'axios';

import AbstractAPI from '../AbstractAPI';
import { INetworkResponse } from '../interface';

export class AuthServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async postUserAuthLogin(
    data: any
  ): Promise<AxiosResponse<INetworkResponse<any>>> {
    return await this.http.request({
      method: `POST`,
      url: `v1/user/register/login/`,
      data,
    });
  }
}
