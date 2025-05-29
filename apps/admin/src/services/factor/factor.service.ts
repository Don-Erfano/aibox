import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  IAddFactor,
  IGetFactorsParams,
  IGetFactorsResponse,
} from './interface';

export class FactorServices extends AbstractAPI {
  constructor() {
    super(`v1/admin/factor/`);
  }

  public async postFactor(
    data: IAddFactor
  ): Promise<AxiosResponse<INetworkResponse<IAddFactor>>> {
    return await this.http.request({
      method: `POST`,
      url: this.url,
      data,
    });
  }

  public async getAllFactors(
    params: IGetFactorsParams
  ): Promise<AxiosResponse<INetworkResponse<IGetFactorsResponse>>> {
    return await this.http.request({
      method: 'GET',
      url: this.url,
      params: { ...params, page_size: 10 },
    });
  }

  public async deleteFactor(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url + id}/`,
    });
  }
}
