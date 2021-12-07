import AppApi from "./AppApi";

interface PostWorldCupReq {
  category: string;
  desc: string;
  files: string;
  title: string;
}
interface GetWorldCupsByIdReq {
  worldCupId: number;
  level: number;
}

class WorldCupApi {
  static baseUrl = `/worldcups`;

  static postWorldCup(data: PostWorldCupReq) {
    return AppApi.post<string>(`${WorldCupApi.baseUrl}`, data);
  }

  static getWorldCups() {
    return AppApi.get<WorldCup[]>(`${WorldCupApi.baseUrl}`);
  }

  static getWorldCupById(param: GetWorldCupsByIdReq) {
    // TODO: 재선한테 말해서 전부 파라미터로 받게
    return AppApi.get<WorldCup>(`${WorldCupApi.baseUrl}/${param.worldCupId}`, {
      level: param.level.toString(),
    });
  }
}

export default WorldCupApi;
