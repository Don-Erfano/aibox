import { AbstractAPI, INetworkResponse } from '@aibox/services';
import { AxiosResponse } from 'axios';

import { GetGiftCodesParams, IGetGiftCodesReponse } from './interface';

export class GiftCodeServices extends AbstractAPI {
  constructor() {
    super(`v1/admin/gift_code/`);
  }

  public async getAllGiftCodes(
    params: GetGiftCodesParams
  ): Promise<AxiosResponse<INetworkResponse<IGetGiftCodesReponse>>> {
    return await this.http.request({
      method: 'GET',
      url: this.url,
      params: { ...params, page_size: 10 },
    });
  }
}
