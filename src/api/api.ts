import axios, { AxiosResponse } from "axios";

interface GetWorldCupByID {
  (worldCupId: number, level: number): Promise<AxiosResponse<WorldCup>>;
}

interface GetWorldCups {
  (): Promise<AxiosResponse<WorldCup[]>>;
}

const getWorldCups: GetWorldCups = () => axios.get("worldcups");
const getWorldCupById: GetWorldCupByID = (worldCupId, level) => axios.get(`/worldcups/${worldCupId}?level=${level}`);

export default { getWorldCupById, getWorldCups };
