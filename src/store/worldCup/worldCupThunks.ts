import { AppThunk } from "..";
import { WorldCupApi } from "../../api";
import RequestUrls from "../../utils/requestUrls";
import requestActions from "../request/requestActions";
import worldCupActions from "./worldCupActions";

interface InitializeWorldCupParam {
  level: number;
  worldCupId: number;
}
interface SelectTargetParam {
  targetId: number;
}

const initializeWorldCup =
  ({ level, worldCupId }: InitializeWorldCupParam): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(requestActions.startRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
      const res = await WorldCupApi.getWorldCupById({ worldCupId, level });
      const { targets, title } = res.data;
      dispatch(requestActions.endRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));

      const currentTargetIds = [targets[0].id, targets[1].id] as [number, number];
      dispatch(worldCupActions.initialize({ targets, title, level }));
      dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));

      return getState().worldCupState;
    } catch (error: any) {
      dispatch(requestActions.failRequest({ url: RequestUrls.getWorldCupById(worldCupId), error }));
      console.log(error);
      // alert(error.message);
      throw error;
    }
  };

const selectTarget =
  ({ targetId }: SelectTargetParam): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(worldCupActions.selectTarget({ selectedTargetId: targetId }));
      const {
        worldCupState: { remainingTargetIds, selectedTargetIds },
      } = getState();
      // 우승자 결정의 시간
      if (remainingTargetIds.length === 0 && selectedTargetIds.length === 1) {
        dispatch(worldCupActions.setWinnerId({ targetId: selectedTargetIds[0] }));
      }
      // 잔여타겟이 없는 상황 즉 다음 레벨로 넘어가야되는 상황
      else if (remainingTargetIds.length === 0) {
        dispatch(worldCupActions.finishCurrentLevel());
      }
      // 그냥 현재 타겟 고르는 상황
      else {
        const currentTargetIds = remainingTargetIds.slice(0, 2) as [number, number];
        dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
      }
      return getState().worldCupState;
    } catch (error: any) {
      console.log(error);
      // alert(error.message);
      throw error;
    }
  };

export default { initializeWorldCup, selectTarget };
