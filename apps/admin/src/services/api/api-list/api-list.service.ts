import { AxiosResponse } from 'axios';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetApiListRequestPayload,
  IGetApiListResponsePayload,
} from './interface';

export default class ApiListServices extends AbstractAPI {
  constructor() {
    super('v1/admin/version');
  }

  public async getApiList(
    params: IGetApiListRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetApiListResponsePayload>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
