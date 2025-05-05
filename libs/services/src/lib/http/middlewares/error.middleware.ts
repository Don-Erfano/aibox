import { IMiddleware } from './interface';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { INetworkResponse } from '../../endpoint/interface';

export default class ErrorMiddleware implements IMiddleware {
  async onResponseError(
    error: AxiosError<INetworkResponse<null>>
  ): Promise<AxiosRequestConfig | void> {
    const { response } = error;
    if (/5[0-9][0-9]/.exec(String(response?.status))) {
      window.location.replace(`${window.location.origin}/error/e5xx`);
    }
    throw error;
  }
}
