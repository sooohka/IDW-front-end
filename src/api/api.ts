import axios, { AxiosResponse } from "axios";

/*
 ********************************************************************************************
 *****************************************APP************************************************
 ********************************************************************************************
 */

const webServerInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
});

interface GetWorldCupByID {
  (worldCupId: number, level: number): Promise<AxiosResponse<WorldCup>>;
}

interface GetWorldCups {
  (): Promise<AxiosResponse<WorldCup[]>>;
}
interface GetCategories {
  (): Promise<AxiosResponse<Category[]>>;
}
interface PostWorldCup {
  (data: { category: string; desc: string; files: string; title: string }): Promise<
    AxiosResponse<string>
  >;
}
const getWorldCups: GetWorldCups = () => webServerInstance.get("/worldcups");
const getWorldCupById: GetWorldCupByID = (worldCupId, level) =>
  webServerInstance.get(`/worldcups/${worldCupId}?level=${level}`);
const getCategories: GetCategories = () => webServerInstance.get("/categories");
const postWorldCup: PostWorldCup = (data) => webServerInstance.post("/worldcups", data);
/*
 ********************************************************************************************
 *****************************************AWS************************************************
 ********************************************************************************************
 */

const awsInstance = axios.create({
  baseURL: process.env.REACT_APP_AWS_GATEWAY_URL,
  // "https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1",
});

interface PostImgToResizingServer {
  (
    param: {
      file: { name: string; contentType: string; dataUri: string };
    },
    setProgress: React.Dispatch<React.SetStateAction<number>>,
  ): Promise<
    AxiosResponse<{
      message: string;
      result: {
        ContentType: string;
        bucketUrl: string;
        url: string;
        locations: { big: string; low: string; original: string; small: string };
      };
    }>
  >;
}

const postImgToResizingServer: PostImgToResizingServer = (param, setProgress) =>
  awsInstance.post("/", param, {
    onUploadProgress: (prog) => {
      setProgress(Math.round(prog.loaded * 100) / prog.total);
    },
  });

const putImgToResizingServer: PostImgToResizingServer = (param, setProgress) =>
  awsInstance.put("/", param, {
    headers: {},
    onUploadProgress: (prog) => {
      setProgress(Math.round(prog.loaded * 100) / prog.total);
    },
  });

export default {
  getWorldCupById,
  getWorldCups,
  getCategories,
  postWorldCup,
  postImgToResizingServer,
  putImgToResizingServer,
};
