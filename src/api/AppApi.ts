import axios, { AxiosRequestConfig } from "axios";
import ApiUtils from "./ApiUtils";

const instance = axios.create({
  timeout: 1000,
});

class AppApi {
  // TODO:
  static baseUrl = process.env.REACT_APP_SERVER_URL;

  static get<T = unknown>(
    url: string,
    queryParams: Record<string, string> = {},
    config?: AxiosRequestConfig,
  ) {
    return instance.get<T>(
      `${AppApi.baseUrl}${url}${ApiUtils.convertObjToQueryParams(queryParams)}`,
      {
        ...instance.defaults,
        ...config,
      },
    );
  }

  static post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post<T>(`${AppApi.baseUrl}${url}`, data, {
      ...instance.defaults,
      ...config,
    });
  }

  static put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put<T>(`${AppApi.baseUrl}${url}`, data, {
      ...instance.defaults,
      ...config,
    });
  }
}
export default AppApi;
