import { AxiosResponse } from 'axios';
import { IGetNewsListRequest, IGetNewsListResponse } from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class NewsService extends AbstractAPI {
  constructor() {
    super('v1/admin/news');
  }

  public async getNewsList(
    params: IGetNewsListRequest
  ): Promise<AxiosResponse<INetworkResponse<IGetNewsListResponse>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
