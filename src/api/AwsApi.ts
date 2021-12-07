import axios, { AxiosRequestConfig } from "axios";
import ApiUtils from "./ApiUtils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_AWS_GATEWAY_URL,
  // "https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1",
});

interface postImgToResizingServerReq {
  param: {
    file: { name: string; contentType: string; dataUri: string };
  };
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}
type PostImgToResizingServerRes = {
  message: string;
  result: {
    ContentType: string;
    bucketUrl: string;
    url: string;
    locations: { big: string; low: string; original: string; small: string };
  };
};

class AwsApi {
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

  static postImgToResizingServer({ param, setProgress }: postImgToResizingServerReq) {
    return AwsApi.post<PostImgToResizingServerRes>("/", param, {
      onUploadProgress: (prog) => {
        setProgress(Math.round(prog.loaded * 100) / prog.total);
      },
    });
  }

  static putImgToResizingServer({ param, setProgress }: postImgToResizingServerReq) {
    return AwsApi.put<PostImgToResizingServerRes>("/", param, {
      headers: {},
      onUploadProgress: (prog) => {
        setProgress(Math.round(prog.loaded * 100) / prog.total);
      },
    });
  }
}

export default AwsApi;
