import { AxiosResponse } from 'axios';
import {
  IDeploymentRequest,
  IDeploymentResponse,
  IDeploymentResult,
  IDeployPayload,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class OperationService extends AbstractAPI {
  constructor() {
    super('v1/admin/operation_service');
  }

  public async getDeployList(
    params: IDeploymentRequest
  ): Promise<AxiosResponse<INetworkResponse<IDeploymentResponse>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/deploy/deployment_list/?scope=apipark`,
      params,
    });
  }

  public async deploy(
    data: IDeployPayload
  ): Promise<AxiosResponse<INetworkResponse<IDeploymentResult>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/deploy/`,
      data,
    });
  }

  public async stopDeploy(
    deploymentName: string
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url}/deploy/${deploymentName}/stop_deploy/`,
    });
  }
}
