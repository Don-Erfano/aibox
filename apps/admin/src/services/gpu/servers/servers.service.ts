import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import {
  CloudStorageSetting,
  IExitQueueRequestPayload,
  IStopServerRequestPayload,
  UpdateCloudStorageSetting,
} from './interface';

export class ServerServices extends AbstractAPI {
  constructor() {
    super('v1/admin/resource_management/');
  }

  public async getErrors(params: any) {
    return this.http.request({
      url: `${this.url}jupyter_errors/`,
      method: 'GET',
      params,
    });
  }

  public async getServers(params: any) {
    return this.http.request({
      url: `${this.url}servers_list/`,
      method: 'GET',
      params,
    });
  }

  public async exitQueue(data: IExitQueueRequestPayload) {
    return this.http.request({
      url: `v1/admin/resource_management/queue_discharge/`,
      method: 'POST',
      data,
    });
  }

  public async downServer(data: IStopServerRequestPayload) {
    return this.http.request({
      url: `v1/admin/resource_management/stop_server/`,
      method: 'POST',
      data,
    });
  }

  public async getCloudStorageSetting(): Promise<
    AxiosResponse<INetworkResponse<CloudStorageSetting>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}volume/get_setting/`,
    });
  }

  public async updateCloudStorageSetting(
    data: UpdateCloudStorageSetting
  ): Promise<AxiosResponse<INetworkResponse<CloudStorageSetting>>> {
    return await this.http.request({
      method: 'PUT',
      url: `${this.url}volume/update_setting/`,
      data,
    });
  }

  public async postCloudStorage(version_id: string) {
    return await this.http.request({
      method: 'POST',
      url: `${this.url}volume/${version_id}/version_volume/`,
    });
  }
}
