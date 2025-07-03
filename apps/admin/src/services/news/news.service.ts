import { AxiosResponse } from 'axios';
import {
  IAddNewsRequestPayload,
  IGetNewsListRequest,
  IGetNewsListResponse,
  INews,
} from './interface';
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

  public async getNewsById(
    id: string
  ): Promise<AxiosResponse<INetworkResponse<INews>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/${id}/`,
    });
  }

  public async addNews(
    data: IAddNewsRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetNewsListResponse>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }

  public async updateNews(
    data: IAddNewsRequestPayload
  ): Promise<AxiosResponse<INetworkResponse<IGetNewsListResponse>>> {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${data.id}/`,
      data,
    });
  }

  public async deleteNews(
    id: number
  ): Promise<AxiosResponse<INetworkResponse<void>>> {
    return await this.http.request({
      method: 'DELETE',
      url: `${this.url}/${id}/`,
    });
  }
}
