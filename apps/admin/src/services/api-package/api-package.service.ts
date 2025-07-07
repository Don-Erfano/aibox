import { AbstractAPI, INetworkResponse } from '@aibox/services';
import {
  ApiResponse,
  UsersApiPackagesParams,
  UsersApiPackagesResponse,
} from './interface';
import { AxiosResponse } from 'axios';

export class ApiPackageService extends AbstractAPI {
  constructor() {
    super('v1/admin/api_package');
  }

  public async getAllUsersApiPackages(
    params: UsersApiPackagesParams
  ): Promise<AxiosResponse<INetworkResponse<UsersApiPackagesResponse>>> {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/user/`,
      params,
    });
  }

  public async deleteUserPackage(
    ids: string[]
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    console.log(ids);
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url}/bulk_cancel/`,
      data: { ids: ids.toString() },
    });
  }

  public async getAllApis(): Promise<
    AxiosResponse<INetworkResponse<ApiResponse>>
  > {
    return await this.http.request({
      method: 'GET',
      url: 'v1/admin/api/all/',
    });
  }
}
