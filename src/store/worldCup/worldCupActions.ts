import { createAction, ActionType } from "typesafe-actions";

const SET_WORLDCUP = "worldcup/set_worldcup";
const SET_TARGETS = "worldcup/set_targets";
const SET_REMAINING_TARGET_IDS = "worldcup/set_remaining_target_ids";
const SET_CURRENT_TARGET_IDS = "worldcup/set_current_targets_ids";
const SELECT_TARGET = "worldcup/select_target";
const CLEAR_CURRENT_TARGETS = "worldcup/clear_current_targets";
const CLEAR_SELECTED_TARGETS = "worldcup/clear_selected_targets";
const SET_LEVEL = "worldcup/set_level";

// action creators
const setTargets = createAction(SET_TARGETS)<{ targets: Target[] }>();
const setRemainingTargetIds = createAction(SET_REMAINING_TARGET_IDS)<{ targetIds: number[] }>();
const setCurrentTargetsIds =
  createAction(SET_CURRENT_TARGET_IDS)<{ currentTargetIds: [number, number] }>();
const selectTarget = createAction(SELECT_TARGET)<{ targetId: number }>();
const clearCurrentTargets = createAction(CLEAR_CURRENT_TARGETS)();
const clearSelectedTargets = createAction(CLEAR_SELECTED_TARGETS)();
const setLevel = createAction(SET_LEVEL)<{ level: number }>();

const actions = {
  setTargets,
  setRemainingTargetIds,
  setCurrentTargetsIds,
  selectTarget,
  clearCurrentTargets,
  clearSelectedTargets,
  setLevel,
};
export type WorldCupActions = ActionType<typeof actions>;

export default actions;
