import { AxiosResponse } from 'axios';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetApiListRequestPayload,
  IGetApiListResponsePayload,
} from './interface';

export default class ApiListServices extends AbstractAPI {
  constructor() {
    super('v2/admin/version');
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

  public async approveApi(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/${id}/approve/`,
    });
  }

  public async resolveProxyError(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/resolve_proxy_error/${id}/`,
    });
  }

  public async rejectApi(
    id: string,
    data: { title: string; description: string }
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/${id}/disapprove/`,
      data,
    });
  }

  public async deprecate(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}/${id}/deprecate/`,
    });
  }
}
