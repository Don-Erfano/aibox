import { ICategoryData } from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

export default class CategoryService extends AbstractAPI {
  constructor() {
    super('v1/admin/mass_notification/message/category');
  }

  public async getCategories(): Promise<
    AxiosResponse<INetworkResponse<ICategoryData>>
  > {
    return this.http.request<INetworkResponse<ICategoryData>>({
      method: 'GET',
      url: `${this.url}/`,
    });
  }
}
