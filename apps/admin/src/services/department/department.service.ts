import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

import { IGetAllDepartments } from './interface';

export class DepartmentService extends AbstractAPI {
  constructor() {
    super(`v1/admin/department/`);
  }

  public async getAllDepartments(): Promise<
    AxiosResponse<INetworkResponse<IGetAllDepartments>>
  > {
    return await this.http.request({
      method: 'GET',
      url: `${this.url}/all/`,
    });
  }
}
