import { AxiosResponse } from 'axios';

import { AbstractAPI, INetworkResponse } from '@aibox/services';

import {
  IGetNodesRequestPayload,
  IGetNodesResponsePayload,
  IGetResourcesResponsePayload,
  IResourceDetailRequestPayload,
  IResourceDetailResponsePayload,
} from './interface';

export class ResourceServices extends AbstractAPI {
  constructor() {
    super('');
  }

  public async getResources(): Promise<
    AxiosResponse<INetworkResponse<IGetResourcesResponsePayload>>
  > {
    return this.http.request({
      url: 'v1/admin/resource_management/resources_general/',
      method: 'GET',
    });
  }

  public async getResourceDetail({
    params,
    scope,
  }: {
    params: IResourceDetailRequestPayload;
    scope: string;
  }): Promise<AxiosResponse<INetworkResponse<IResourceDetailResponsePayload>>> {
    return this.http.request({
      url: `v1/admin/resource_management/resource_detail/${scope}/`,
      method: 'GET',
      params,
    });
  }

  public async getNodes({
    params,
    scope,
    profile,
  }: {
    params: IGetNodesRequestPayload;
    scope: string;
    profile: string;
  }): Promise<AxiosResponse<INetworkResponse<IGetNodesResponsePayload>>> {
    return this.http.request({
      url: `v1/admin/resource_management/resource_profile_detail/${scope}/${profile}/`,
      method: 'GET',
      params,
    });
  }
}
