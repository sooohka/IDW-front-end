import { getType } from "typesafe-actions";
import { CurrentTargetIds, WorldCupReducer } from "./types";
import actions, { WorldCupActions } from "./worldCupActions";

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
    // TODO: need test
    case getType(actions.initializeWorldCup): {
      const { level, targets, title } = action.payload;
      if (level % 2 === 1 || level < 2) throw new Error("level은 짝수, 2이상이여야 합니다");
      if (level !== targets.length) throw new Error("level과 타겟들의 길이는 같아야 합니다");
      const remainingTargetIds = targets.map((t) => t.id);
      const currentTargetIds: CurrentTargetIds = [targets[0].id, targets[1].id];
      return { ...state, title, targets, remainingTargetIds, currentTargetIds, level };
    }
    // TODO: need test
    case getType(actions.finishCurrentLevel): {
      const isOdd = state.level % 2 === 1;
      if (isOdd || state.level < 2) throw new Error("level은 항상 짝수이면서 2이상이여야합니다");
      if (state.remainingTargetIds.length !== 0) throw new Error("remainingTarget이 남아있습니다");
      if (state.selectedTargetIds.length < 2) throw new Error("선택된 타겟의 길이가 2 이하입니다.");
      const remainingTargetIds = [...state.selectedTargetIds];
      const level = state.level / 2;

      return { ...state, remainingTargetIds, selectedTargetIds: [], level };
    }
    // TODO: need test
    case getType(actions.selectTarget): {
      const { targetId } = action.payload;
      let unselectedId: null | number = null;
      let selectedId: null | number = null;
      if (state.currentTargetIds.length < 2) throw new Error("현재 타겟들의 길이가 2 이하입니다.");
      state.currentTargetIds.forEach((id) => {
        if (id !== targetId) unselectedId = id;
        else selectedId = id;
      });
      if (!unselectedId) throw new Error("선택되지 않은 타겟이 없습니다.");
      if (!selectedId) throw new Error("선택된 타겟이 없습니다.");
      const selectedTargetIds = [...state.selectedTargetIds, targetId];
      const remainingTargetIds = state.remainingTargetIds.filter(
        (id) => id !== unselectedId && id !== selectedId,
      );
      return { ...state, selectedTargetIds, remainingTargetIds };
    }
    // TODO: need test
    case getType(actions.setCurrentTargetIds): {
      if (state.remainingTargetIds.length < 2) throw new Error("잔여타겟의 길이가 2 이하입니다.");
      const currentTargetIds: CurrentTargetIds = [
        state.remainingTargetIds[0],
        state.remainingTargetIds[1],
      ];
      return { ...state, currentTargetIds };
    }

    case getType(actions.setWinnerId): {
      const { targetId } = action.payload;
      return { ...state, winnerId: targetId };
    }

    case getType(actions.reset): {
      return initialState;
    }
    default:
      return { ...state };
  }
};

export default worldCupReducer;
