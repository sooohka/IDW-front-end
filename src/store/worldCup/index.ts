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
    case getType(actions.initialize): {
      const { targets, title, level } = action.payload;
      if (level % 2 === 1 || level < 2) throw new Error("level은 짝수, 2이상이여야 합니다");
      if (level !== targets.length) throw new Error("level과 타겟들의 길이는 같아야 합니다");
      const remainingTargetIds = targets.map((t) => t.id);
      return { ...state, title, targets, remainingTargetIds, level };
    }

    case getType(actions.finishCurrentLevel): {
      const isOdd = state.level % 2 === 1;
      if (isOdd || state.level < 2) throw new Error("level은 항상 짝수이면서 2이상이여야합니다");
      if (state.remainingTargetIds.length !== 0) throw new Error("remainingTarget이 남아있습니다");
      const remainingTargetIds = [...state.selectedTargetIds];
      const currentTargetIds = state.selectedTargetIds.slice(0, 2) as [number, number];
      const level = state.level / 2;
      return { ...state, remainingTargetIds, currentTargetIds, selectedTargetIds: [], level };
    }

    // TODO:약간 로직이 복잡함 줄일필요가 있음
    case getType(actions.selectTarget): {
      const { selectedTargetId } = action.payload;
      const { currentTargetIds, selectedTargetIds, remainingTargetIds } = state;
      let [unselectedId, selectedId] = [null, null] as (number | null)[];
      if (currentTargetIds.length < 2) throw new Error("현재 타겟들의 길이가 2 이하입니다.");
      currentTargetIds.forEach((id) => {
        if (id !== selectedTargetId) unselectedId = id;
        else selectedId = id;
      });
      if (!unselectedId) throw new Error("선택되지 않은 타겟이 없습니다.");
      if (!selectedId) throw new Error("선택된 타겟이 없습니다.");

      const filteredRemainingTargetIds = remainingTargetIds.filter(
        (id) => id !== unselectedId && id !== selectedId,
      );
      return {
        ...state,
        selectedTargetIds: [...selectedTargetIds, selectedTargetId],
        remainingTargetIds: filteredRemainingTargetIds,
      };
    }

    case getType(actions.setWinnerId): {
      const { targetId } = action.payload;
      return { ...state, winnerId: targetId };
    }

    case getType(actions.setCurrentTargetIds): {
      const { currentTargetIds } = action.payload;
      return { ...state, currentTargetIds };
    }

    case getType(actions.reset): {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default worldCupReducer;
