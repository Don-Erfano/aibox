import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios';
import { IMiddleware } from './interface';
import nookies from 'nookies';
import { INetworkResponse } from '../../abstractApi/interface';

export default class AuthMiddleware implements IMiddleware {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error: any) => void;
    config: InternalAxiosRequestConfig;
  }> = [];

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      }
    });
    this.failedQueue = [];
  }

  async onRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    if (typeof window) {
      const { token } = nookies.get();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  }

  async onResponseError(
    error: AxiosError<INetworkResponse<null>>
  ): Promise<AxiosRequestConfig | void> {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    const fallback = process.env[`NEXT_PUBLIC_FALLBACK`] as string;

    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      const { refreshToken } = nookies.get();
      if (!refreshToken) {
        nookies.destroy(null, 'token');
        window.location.replace(`${window.location.origin}/${fallback}`);
        return;
      }

      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      this.isRefreshing = true;
      try {
        const resp = await axios.post(
          process.env[`NEXT_PUBLIC_REFRESH_TOKEN_ROUTE`] as string,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          }
        );
        const newToken = resp.data.token;
        nookies.set(null, 'token', newToken, { path: '/' });
        this.processQueue(null, newToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return originalRequest;
      } catch (refreshError) {
        this.processQueue(refreshError, null);
        nookies.destroy(null, 'token');
        nookies.destroy(null, 'refreshToken');
        window.location.replace(`${window.location.origin}/${fallback}`);
        return;
      } finally {
        this.isRefreshing = false;
      }
    }

    if (error.response?.data.code === 'not_authenticated') {
      window.location.replace(`${window.location.origin}/${fallback}`);
    }
    throw error;
  }
}
