import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  IAddFactor,
  IFactor,
  IGetFactorsParams,
  IGetFactorsResponse,
  IUpdateFactor,
} from './interface';

export class FactorServices extends AbstractAPI {
  constructor() {
    super(`v1/admin/factor/`);
  }

  public async postFactor(
    data: IAddFactor
  ): Promise<AxiosResponse<INetworkResponse<IAddFactor>>> {
    return await this.http.request({
      method: 'POST',
      url: this.url,
      data,
    });
  }

  public async updateFactor(
    data: IUpdateFactor
  ): Promise<AxiosResponse<INetworkResponse<IUpdateFactor>>> {
    const { id, ...factorData } = data;
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}${id}/`,
      data: factorData,
    });
  }

  public async getAllFactors(
    params: IGetFactorsParams
  ): Promise<AxiosResponse<INetworkResponse<IGetFactorsResponse>>> {
    return await this.http.request({
      method: 'GET',
      url: this.url,
      params,
    });
  }

  public async getFactor(
    id?: string
  ): Promise<AxiosResponse<INetworkResponse<IFactor>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}${id}/`,
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
