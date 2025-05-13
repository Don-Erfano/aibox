import { AxiosResponse } from 'axios';
import { AbstractAPI } from '@aibox/services';

export class AuthServices extends AbstractAPI {
  constructor() {
    super(``);
  }
  public async postUserAuthLogin(data: any): Promise<AxiosResponse<any>> {
    return await this.http.request({
      method: `POST`,
      url: `v1/user/register/login/`,
      data,
    });
  }
}
