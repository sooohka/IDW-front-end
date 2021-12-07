import { createReducer, getType, Reducer } from "typesafe-actions";
import actions, { WorldCupActions } from "./worldCupActions";

export interface WorldCupReducer {
  targets: Target[];
  remainingTargetIds: number[];
  currentTargetIds: [number, number] | [];
  selectedTargetIds: number[];
  level: number; // 2의 배수
}

const initialState: WorldCupReducer = {
  targets: [],
  remainingTargetIds: [],
  currentTargetIds: [],
  selectedTargetIds: [],
  level: 0,
};
const worldCupReducer = (state = initialState, action: WorldCupActions): WorldCupReducer => {
  switch (action.type) {
    case getType(actions.setTargets): {
      const { targets } = action.payload;
      if (targets.length === 0)
        throw new Error("state를 초기화하는데 실패했습니다.(타겟들의 길이가 0임)");

      return { ...state, targets };
    }

    case getType(actions.setRemainingTargetIds): {
      const { targetIds } = action.payload;
      return { ...state, remainingTargetIds: targetIds };
    }

    case getType(actions.selectTarget): {
      const { targetId } = action.payload;
      const selectedTargetIds = [...state.selectedTargetIds, targetId];
      return { ...state, selectedTargetIds };
    }

    case getType(actions.setCurrentTargetsIds): {
      const { currentTargetIds } = action.payload;

      return { ...state, currentTargetIds };
    }
    case getType(actions.clearCurrentTargets): {
      if (state.currentTargetIds.length === 0) return { ...state };
      const remainingTargetIds = state.remainingTargetIds.filter((targetId) => {
        if (state.currentTargetIds[0] === targetId || state.currentTargetIds[1] === targetId)
          return false;
        return true;
      });
      return { ...state, remainingTargetIds, currentTargetIds: [] };
    }
    case getType(actions.clearSelectedTargets): {
      return { ...state, selectedTargetIds: [] };
    }
    case getType(actions.setLevel): {
      const { level } = action.payload;
      return { ...state, level };
    }

    default:
      return { ...state };
  }
};

export default worldCupReducer;
