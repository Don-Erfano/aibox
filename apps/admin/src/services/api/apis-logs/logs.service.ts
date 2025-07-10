import { AxiosResponse } from 'axios';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  IGetApisLogsRequestPayload,
  IGetApisLogsResponsePayload,
} from './interface';

export default class ApisLogsServices extends AbstractAPI {
  constructor() {
    super('');
  }

  public async getApisLogs(
    params: IGetApisLogsRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetApisLogsResponsePayload>>> {
    return await this.http.request({
      method: 'GET',
      url: `v1/admin/api/platform_report/`,
      params,
    });
  }
}
