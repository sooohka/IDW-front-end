import axios, { AxiosRequestConfig } from "axios";
import ApiUtils from "./ApiUtils";

const instance = axios.create({
  // "https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1",
});

interface PostImgToResizingServerReq {
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
  static baseUrl = process.env.REACT_APP_AWS_GATEWAY_URL;

  static get<T = unknown>(
    url: string,
    queryParams: Record<string, string> = {},
    config?: AxiosRequestConfig,
  ) {
    return instance.get<T>(`${AwsApi.baseUrl}${ApiUtils.convertObjToQueryParams(queryParams)}`, {
      ...instance.defaults,
      ...config,
    });
  }

  static post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post<T>(`${AwsApi.baseUrl}`, data, {
      ...instance.defaults,
      ...config,
    });
  }

  static put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put<T>(`${AwsApi.baseUrl}`, data, {
      ...instance.defaults,
      ...config,
    });
  }

  static postImgToResizingServer({ param, setProgress }: PostImgToResizingServerReq) {
    return AwsApi.post<PostImgToResizingServerRes>("/", param, {
      onUploadProgress: (prog) => {
        setProgress(Math.round(prog.loaded * 100) / prog.total);
      },
    });
  }

  static putImgToResizingServer({ param, setProgress }: PostImgToResizingServerReq) {
    return AwsApi.put<PostImgToResizingServerRes>("/", param, {
      headers: {},
      onUploadProgress: (prog) => {
        setProgress(Math.round(prog.loaded * 100) / prog.total);
      },
    });
  }
}

export default AwsApi;
