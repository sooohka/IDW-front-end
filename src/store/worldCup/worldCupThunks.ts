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
  async (dispatch) => {
    try {
      dispatch(requestActions.startRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
      const res = await WorldCupApi.getWorldCupById({ worldCupId, level });
      console.log(res);
      const { targets, title } = res.data;
      dispatch(worldCupActions.setTitle({ title }));
      dispatch(worldCupActions.setTargets({ targets }));
      const remainingTargetIds = targets.map((target) => target.id);
      const currentTargetIds: [number, number] = [targets[0].id, targets[1].id];

      dispatch(worldCupActions.setRemainingTargetIds({ targetIds: remainingTargetIds }));
      dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
      dispatch(worldCupActions.setLevel({ level }));
      dispatch(requestActions.endRequest({ url: RequestUrls.getWorldCupById(worldCupId) }));
    } catch (error: any) {
      dispatch(requestActions.failRequest({ url: RequestUrls.getWorldCupById(worldCupId), error }));
      console.log(error);
      alert(error.message);
      throw error;
    }
  };

const checkWorldCup = (): AppThunk => (dispatch, getState) => {
  const { worldCupState } = getState();
  if (worldCupState.remainingTargetIds.length === 0) {
    const { level, selectedTargetIds } = worldCupState;
    dispatch(worldCupActions.setRemainingTargetIds({ targetIds: [...selectedTargetIds] }));
    const currentTargetIds: [number, number] = [
      worldCupState.selectedTargetIds[0],
      worldCupState.selectedTargetIds[1],
    ];
    dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
    dispatch(worldCupActions.clearSelectedTargetIds());
    dispatch(worldCupActions.setLevel({ level: level / 2 }));

    const { worldCupState: newWorldCupState } = getState();
    if (newWorldCupState.level === 1 && newWorldCupState.remainingTargetIds.length === 1) {
      const winnerId = newWorldCupState.remainingTargetIds[0];
      dispatch(worldCupActions.setWinnerId({ targetId: winnerId }));
    }
  } else {
    const currentTargetIds: [number, number] = [
      worldCupState.remainingTargetIds[0],
      worldCupState.remainingTargetIds[1],
    ];
    dispatch(worldCupActions.setCurrentTargetIds({ currentTargetIds }));
  }
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
      dispatch(checkWorldCup());
      //
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      throw error;
    }
  };

export default { initializeWorldCup, selectTarget };
