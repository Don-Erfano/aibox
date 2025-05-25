import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  IGetShareRequestPayload,
  IGetShareResponsePayload,
  IUpdateShareRequestPayload,
  IUpdateShareResponsePayload,
} from './interface';

export default class ProviderShareServices extends AbstractAPI {
  constructor() {
    super('v1/admin/wage_percentage');
  }
  public async getProviderShare(
    params: IGetShareRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetShareResponsePayload>>> {
    const { id } = params;

    if (!id) {
      throw new Error('User ID is required');
    }

    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }

  public async updateProviderShare(
    params: IUpdateShareRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IUpdateShareResponsePayload>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data: params,
    });
  }
}
