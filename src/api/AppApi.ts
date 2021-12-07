import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiUtils from "./ApiUtils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
});

class AppApi {
  static get<T = unknown>(
    url: string,
    queryParams: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ) {
    return instance.get<T>(url + ApiUtils.convertObjToQueryParams(queryParams), {
      ...instance.defaults,
      ...config,
    });
  }

  static post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, {
      ...instance.defaults,
      ...config,
    });
  }

  static put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put<T>(url, data, {
      ...instance.defaults,
      ...config,
    });
  }
}
export default AppApi;
