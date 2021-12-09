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
    const initialize = (data: WorldCup) => {
      const { targets, title } = data;
      dispatch(worldCupActions.setTitle({ title }));
      dispatch(worldCupActions.setTargets({ targets }));
      dispatch(worldCupActions.setRemainingTargetIds({ targetIds: targets.map((t) => t.id) }));
      dispatch(
        worldCupActions.setCurrentTargetIds({ currentTargetIds: [targets[0].id, targets[1].id] }),
      );
      dispatch(worldCupActions.setLevel({ level }));
    };

    try {
      dispatch(requestActions.startRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
      const res = await WorldCupApi.getWorldCupById({ worldCupId, level });
      initialize(res.data);
      dispatch(requestActions.endRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
    } catch (error: any) {
      dispatch(requestActions.failRequest({ url: RequestUrls.getWorldCupById(worldCupId), error }));
      console.log(error);
      // alert(error.message);
      throw error;
    }
    return getState().worldCupState;
  };

const goToNextLevel = (): AppThunk => (dispatch, getState) => {
  const { worldCupState } = getState();
  const { level, selectedTargetIds } = worldCupState;
  dispatch(worldCupActions.setRemainingTargetIds({ targetIds: [...selectedTargetIds] }));
  const currentTargetIds: [number, number] = [
    worldCupState.selectedTargetIds[0],
    worldCupState.selectedTargetIds[1],
  ];
  dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
  dispatch(worldCupActions.clearSelectedTargetIds());
  dispatch(worldCupActions.setLevel({ level: level / 2 }));
  return getState().worldCupState;
};

const finishCurrentLevel = (): AppThunk => (dispatch, getState) => {
  const { worldCupState: state } = getState();
  // 우승자 결정의 시간
  if (state.remainingTargetIds.length === 0 && state.selectedTargetIds.length === 1) {
    const winnerId = state.selectedTargetIds[0];
    dispatch(worldCupActions.setWinnerId({ targetId: winnerId }));
  }
  // 잔여타겟이 없는 상황 즉 다음 레벨로 넘어가야되는 상황
  else if (state.remainingTargetIds.length === 0) {
    dispatch(goToNextLevel());
  }
  // 그냥 현재 타겟 고르는 상황
  else {
    const { worldCupState } = getState();
    const currentTargetIds: [number, number] = [
      worldCupState.remainingTargetIds[0],
      worldCupState.remainingTargetIds[1],
    ];
    dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
  }
  return getState().worldCupState;
};

const selectTarget =
  ({ targetId }: SelectTargetParam): AppThunk =>
  (dispatch, getState) => {
    try {
      const { worldCupState } = getState();

      let unselectedId: null | number = null;
      let selectedId: null | number = null;
      worldCupState.currentTargetIds.forEach((id) => {
        if (id !== targetId) unselectedId = id;
        else selectedId = id;
      });
      if (!unselectedId) throw new Error("선택되지 않은 타겟이 없습니다.");
      if (!selectedId) throw new Error("선택된 타겟이 없습니다.");
      dispatch(worldCupActions.addSelectedTargetIds({ targetId }));
      dispatch(worldCupActions.removeRemainingTargetIds({ targetId: unselectedId }));
      dispatch(worldCupActions.removeRemainingTargetIds({ targetId: selectedId }));
      dispatch(finishCurrentLevel());
      //
    } catch (error: any) {
      console.log(error);
      // alert(error.message);
      throw error;
    }
    return getState().worldCupState;
  };

export default { initializeWorldCup, finishCurrentLevel, selectTarget };
