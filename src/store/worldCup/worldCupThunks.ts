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
      const { title, targets } = res.data;
      dispatch(worldCupActions.initializeWorldCup({ title, level, targets }));

      dispatch(requestActions.endRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
    } catch (error: any) {
      dispatch(requestActions.failRequest({ url: RequestUrls.getWorldCupById(worldCupId), error }));
      console.log(error);
      // alert(error.message);
      throw error;
    }
    return getState().worldCupState;
  };

const selectTarget =
  ({ targetId }: SelectTargetParam): AppThunk =>
  (dispatch, getState) => {
    try {
      dispatch(worldCupActions.selectTarget({ targetId }));
      const { worldCupState: state } = getState();
      // 우승자 결정의 시간
      if (state.remainingTargetIds.length === 0 && state.selectedTargetIds.length === 1) {
        dispatch(worldCupActions.setWinnerId({ targetId: state.selectedTargetIds[0] }));
      }
      // 잔여타겟이 없는 상황 즉 다음 레벨로 넘어가야되는 상황
      else if (state.remainingTargetIds.length === 0) {
        dispatch(worldCupActions.finishCurrentLevel());
        dispatch(worldCupActions.setCurrentTargetIds());
      }
      // 그냥 현재 타겟 고르는 상황
      else {
        dispatch(worldCupActions.setCurrentTargetIds());
      }
      //
    } catch (error: any) {
      console.log(error);
      // alert(error.message);
      throw error;
    }
    return getState().worldCupState;
  };

export default { initializeWorldCup, selectTarget };
