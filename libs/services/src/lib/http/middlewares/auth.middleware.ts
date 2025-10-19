import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { IMiddleware } from './interface';
import { INetworkResponse } from '../../abstractApi';

function getCookieValue(name: string): string | undefined {
  if (typeof window !== 'undefined') {
    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : undefined;
  } else {
    return process.env[`COOKIE_${name.toUpperCase()}`];
  }
}

function setCookieValue(name: string, value: string, maxAgeSeconds: number) {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; max-age=${maxAgeSeconds}`;
  }
}

function clearAuthCookies() {
  setCookieValue('token', '', -1);
  setCookieValue('refreshToken', '', -1);
}

export default class AuthMiddleware implements IMiddleware {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error: any) => void;
    config: InternalAxiosRequestConfig;
  }> = [];

  async onRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const token = getCookieValue('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  async onResponseError(
    error: AxiosError<INetworkResponse<null>>
  ): Promise<AxiosRequestConfig | void> {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;
    const fallback = process.env.NEXT_PUBLIC_FALLBACK as string;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookieValue('refreshToken');
      if (!refreshToken) {
        clearAuthCookies();
        if (typeof window !== 'undefined') {
          window.location.replace(`${window.location.origin}/${fallback}`);
        }
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
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_ROUTE as string,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          }
        );

        const newToken = resp.data?.token;
        if (!newToken) throw new Error('Invalid refresh token response');

        setCookieValue('token', newToken, 60 * 60 * 24); // 1 day
        this.processQueue(null, newToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return originalRequest;
      } catch (refreshError) {
        this.processQueue(refreshError, null);
        clearAuthCookies();
        if (typeof window !== 'undefined') {
          window.location.replace(`${window.location.origin}/${fallback}`);
        }
        return;
      } finally {
        this.isRefreshing = false;
      }
    }

    throw error;
  }

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
}
