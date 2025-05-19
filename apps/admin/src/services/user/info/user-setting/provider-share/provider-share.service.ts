import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import { IGetShareRequestPayload, IGetShareResponsePayload } from './interface';

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
}
