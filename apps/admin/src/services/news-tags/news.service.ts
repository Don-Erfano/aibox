import { AxiosResponse } from 'axios';
import { IGetNewsTags, IGetNewsTagsRequest } from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class NewsTagsService extends AbstractAPI {
  constructor() {
    super('v1/admin/news_tags');
  }

  public async getNewsTags(
    params: IGetNewsTagsRequest
  ): Promise<AxiosResponse<INetworkResponse<IGetNewsTags>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
}
