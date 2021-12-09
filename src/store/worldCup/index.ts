import { getType } from "typesafe-actions";
import actions, { WorldCupActions } from "./worldCupActions";

export interface WorldCupReducer {
  title: string;
  targets: Target[];
  remainingTargetIds: number[];
  currentTargetIds: [number, number] | [];
  selectedTargetIds: number[];
  level: number; // 2의 배수
  winnerId: number | null;
}

export const initialState: WorldCupReducer = {
  title: "",
  targets: [],
  remainingTargetIds: [],
  currentTargetIds: [],
  selectedTargetIds: [],
  level: 0,
  winnerId: null,
};

const worldCupReducer = (state = initialState, action: WorldCupActions): WorldCupReducer => {
  switch (action.type) {
    case getType(actions.setTitle): {
      const { title } = action.payload;
      return { ...state, title };
    }

    case getType(actions.setTargets): {
      const { targets } = action.payload;
      if (targets.length === 0)
        throw new Error("state를 초기화하는데 실패했습니다.(타겟들의 길이가 0임)");
      return { ...state, targets };
    }

    case getType(actions.setLevel): {
      const { level } = action.payload;
      return { ...state, level };
    }
    case getType(actions.setWinnerId): {
      const { targetId } = action.payload;
      return { ...state, winnerId: targetId };
    }

    case getType(actions.setRemainingTargetIds): {
      const { targetIds } = action.payload;
      return { ...state, remainingTargetIds: [...targetIds] };
    }

    case getType(actions.setCurrentTargetIds): {
      const { currentTargetIds } = action.payload;
      return { ...state, currentTargetIds };
    }

    case getType(actions.addSelectedTargetIds): {
      const { targetId } = action.payload;
      return { ...state, selectedTargetIds: [...state.selectedTargetIds, targetId] };
    }

    case getType(actions.removeRemainingTargetIds): {
      const { targetId } = action.payload;
      const remainingTargetIds = state.remainingTargetIds.filter((id) => id !== targetId);
      return { ...state, remainingTargetIds };
    }

    case getType(actions.clearSelectedTargetIds): {
      return { ...state, selectedTargetIds: [] };
    }

    case getType(actions.reset): {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default worldCupReducer;
