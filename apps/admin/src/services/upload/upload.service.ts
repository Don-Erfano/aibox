import { AxiosResponse } from 'axios';
import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { IUploadThumbnailNewsResponse } from './interface';

export default class UploadService extends AbstractAPI {
  constructor() {
    super('v1/uploader');
  }

  public async uploadThumbnailNews(
    data: FormData
  ): Promise<AxiosResponse<INetworkResponse<IUploadThumbnailNewsResponse>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data,
    });
  }
}
