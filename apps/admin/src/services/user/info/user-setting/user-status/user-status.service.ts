import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  IUpdateUserStatusRequestPayload,
  IUpdateUserStatusResponsePayload,
} from './interface';

export default class UserStatusServices extends AbstractAPI {
  constructor() {
    super('v1/admin/');
  }
  public async getUserStatus({
    id,
  }: IUpdateUserStatusRequestPayload): Promise<
    AxiosResponse<INetworkResponse<IUpdateUserStatusResponsePayload>>
  > {
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/`,
    });
  }
}
