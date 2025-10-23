import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';
import { GpuSettingResponse } from '@/services/gpu/gpu-setting/interface';

export class GpuSettingService extends AbstractAPI {
  constructor() {
    super('v1/admin/resource_package');
  }

  public async getGpuSetting(): Promise<
    AxiosResponse<INetworkResponse<GpuSettingResponse>>
  > {
    return this.http.request({
      url: `${this.url}/get_setting/`,
      method: 'GET',
    });
  }

  public async putGpuSetting(
    data: GpuSettingResponse
  ): Promise<AxiosResponse<INetworkResponse<object>>> {
    return this.http.request({
      url: `${this.url}/update_setting/`,
      method: 'PUT',
      data,
    });
  }
}
