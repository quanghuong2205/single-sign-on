import axios, { AxiosInstance } from 'axios';
import { STATUS_CODE_SUCCESS } from '@/enum';
import { APP_CONFIG } from '@/configs/app.key';

interface IError {
  statusCode: number;
  message: string;
}

const DEFAULT_HEADERS: ObjAny = { 'Content-Type': 'application/json' };

class HttpService {
  protected axiosInstance: AxiosInstance;
  protected tokenKey: string;

  constructor(baseURL: string = APP_CONFIG.apiUrl, tokenKey: string = APP_CONFIG.tokenKey) {
    this.tokenKey = tokenKey;

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: this.configRequest().headers,
    });

    this.axiosInstance.interceptors.request.use((config: any) => {
      if (this.tokenKey) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.tokenKey}`,
        };
      }
      return config;
    });
  }

  configRequest(multipart = false) {
    const headers = { ...DEFAULT_HEADERS };
    if (multipart) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return {
      headers,
    };
  }

  querySearch(params: ObjAny = {}): string {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  async get(apiEndpoint: string, params = {}): Promise<any> {
    if (Object.keys(params).length > 0) {
      apiEndpoint = `${apiEndpoint}?${this.querySearch(params)}`;
    }
    try {
      const res = await this.axiosInstance.get(apiEndpoint);
      if (res?.status === STATUS_CODE_SUCCESS) {
        return res.data;
      }
    } catch (err: any) {
      this.handleError(err.response?.data || { message: 'Unknown error', statusCode: 500 });
    }
  }

  async post(apiEndpoint: string, payload: any, config?: any): Promise<any> {
    try {
      const res = await this.axiosInstance.post(apiEndpoint, payload, { ...this.configRequest(false), ...config });
      if (res?.status === STATUS_CODE_SUCCESS || res?.status === 201) {
        return res.data;
      }
    } catch (err: any) {
      this.handleError(err.response?.data || { message: 'Unknown error', statusCode: 500 });
    }
  }

  async put(apiEndpoint: string, payload: any, config?: any): Promise<any> {
    try {
      const res = await this.axiosInstance.put(apiEndpoint, payload, { ...this.configRequest(false), ...config });
      if (res?.status === STATUS_CODE_SUCCESS) {
        return res.data;
      }
    } catch (err: any) {
      this.handleError(err.response?.data || { message: 'Unknown error', statusCode: 500 });
    }
  }

  async delete(apiEndpoint: string): Promise<any> {
    try {
      const res = await this.axiosInstance.delete(apiEndpoint);
      if (res?.status === STATUS_CODE_SUCCESS) {
        return res.data;
      }
    } catch (err: any) {
      this.handleError(err.response?.data || { message: 'Unknown error', statusCode: 500 });
    }
  }

  handleError(error: IError) {
    return Promise.reject(error);
  }
}

export default HttpService;
