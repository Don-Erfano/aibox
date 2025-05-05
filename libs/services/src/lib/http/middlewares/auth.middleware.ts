import {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { IMiddleware } from './interface';
import nookies from 'nookies';
import { INetworkResponse } from '../../endpoint/interface';

export default class AuthMiddleware implements IMiddleware {
  async onRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    if (typeof window) {
      const { token } = nookies.get();
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  }

  async onResponse(response: AxiosResponse<any>): Promise<AxiosResponse<any>> {
    return response;
  }

  async onResponseError(
    error: AxiosError<INetworkResponse<null>>
  ): Promise<AxiosRequestConfig | void> {
    const { response } = error;
    const fallback = process.env[`NEXT_PUBLIC_FALLBACK`] as string;
    if (response?.data.code === `not_authenticated`) {
      window.location.replace(`${window.location.origin}/${fallback}`);
    }
    throw error;
  }
}
