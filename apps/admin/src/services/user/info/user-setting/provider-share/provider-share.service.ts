import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import { IProviderShareRequest, IProviderShareResponse } from './interface';

export default class ProviderShareServices extends AbstractAPI {
  constructor() {
    super('v1/admin/wage_percentage');
  }
  public async getProviderShare({
    id,
  }: IProviderShareRequest): Promise<
    AxiosResponse<INetworkResponse<IProviderShareResponse>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }
}
