interface RState {
  targets: Target[];
  remainingTargetIds: number[];
  currentTargetIds: [number, number] | [];
  selectedTargetIds: number[];
  level: number; // 2의 배수
}

const initialState: RState = {
  targets: [],
  remainingTargetIds: [],
  currentTargetIds: [],
  selectedTargetIds: [],
  level: 0,
};

const initializeState = (targets: Target[], level: number) => ({
  type: "initialize_state" as const,
  payload: { targets, level },
});

const setRemainingTargetIds = (targetIds: number[]) => ({
  type: "set_remaining_targets_ids" as const,
  payload: { targetIds },
});

const setCurrentTargetsIds = () => ({ type: "set_current_targets_ids" as const });

const selectTarget = (id: number) => ({
  type: "select_target" as const,
  payload: { targetId: id },
});

const clearCurrentTargets = () => ({
  type: "clear_current_targets" as const,
});

const clearSelectedTargets = () => ({ type: "clear_selected_targets" as const });

const setLevel = (level: number) => ({ type: "set_level" as const, payload: { level } });

type RActions =
  | ReturnType<typeof initializeState>
  | ReturnType<typeof selectTarget>
  | ReturnType<typeof setRemainingTargetIds>
  | ReturnType<typeof setCurrentTargetsIds>
  | ReturnType<typeof clearCurrentTargets>
  | ReturnType<typeof clearSelectedTargets>
  | ReturnType<typeof setLevel>;

const reducer: React.Reducer<RState, RActions> = (state, action) => {
  switch (action.type) {
    case "initialize_state": {
      const { level, targets } = action.payload;
      if (targets.length === 0)
        throw new Error("state를 초기화하는데 실패했습니다.(타겟들의 길이가 0임)");
      const remainingTargetIds = targets.map((target) => target.id);
      const currentTargetIds: [number, number] = [targets[0].id, targets[1].id];
      return { ...state, targets, remainingTargetIds, currentTargetIds, level };
    }

    case "set_remaining_targets_ids": {
      const { targetIds } = action.payload;
      return { ...state, remainingTargetIds: targetIds };
    }

    case "select_target": {
      const { targetId } = action.payload;
      const selectedTargetIds = [...state.selectedTargetIds, targetId];
      return { ...state, selectedTargetIds };
    }

    case "set_current_targets_ids": {
      if (state.remainingTargetIds.length === 0)
        throw new Error("잔여타겟의 길이가 0이라 현재 타겟을 설정못함");
      const currentTargetIds: [number, number] = [
        state.remainingTargetIds[0],
        state.remainingTargetIds[1],
      ];
      return { ...state, currentTargetIds };
    }

    case "clear_current_targets": {
      if (state.currentTargetIds.length === 0) return { ...state };
      const remainingTargetIds = state.remainingTargetIds.filter((targetId) => {
        if (state.currentTargetIds[0] === targetId || state.currentTargetIds[1] === targetId)
          return false;
        return true;
      });
      return { ...state, remainingTargetIds, currentTargetIds: [] };
    }

    case "clear_selected_targets": {
      return { ...state, selectedTargetIds: [] };
    }

    case "set_level": {
      const { level } = action.payload;
      return { ...state, level };
    }

    default:
      return { ...state };
  }
};

export default reducer;

export {
  initialState,
  initializeState,
  selectTarget,
  setCurrentTargetsIds,
  setRemainingTargetIds,
  clearCurrentTargets,
  clearSelectedTargets,
  setLevel,
};
