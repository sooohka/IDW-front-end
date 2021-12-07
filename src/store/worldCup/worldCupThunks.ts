import { Dispatch } from "react";
import { AppThunk } from "..";
import worldCupActions, { WorldCupActions } from "./worldCupActions";

// case getType(actions.setWorldCup): {
//   const { level, targets } = action.payload;

//   if (targets.length === 0)
//     throw new Error("state를 초기화하는데 실패했습니다.(타겟들의 길이가 0임)");

//   const remainingTargetIds = targets.map((target) => target.id);
//   const currentTargetIds: [number, number] = [targets[0].id, targets[1].id];
//   return { ...state, targets, remainingTargetIds, currentTargetIds, level };
// }

const initializeWorldCup =
  ({ level, targets }: { level: number; targets: Target[] }): AppThunk =>
  (dispatch: Dispatch<WorldCupActions>) => {
    try {
      dispatch(worldCupActions.setTargets({ targets }));
      const remainingTargetIds = targets.map((target) => target.id);
      dispatch(worldCupActions.setRemainingTargetIds({ targetIds: remainingTargetIds }));

      const currentTargetIds: [number, number] = [targets[0].id, targets[1].id];
      dispatch(worldCupActions.setCurrentTargetsIds({ currentTargetIds }));
      dispatch(worldCupActions.setLevel({ level }));
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };

export default { initializeWorldCup };
