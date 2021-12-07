import { createAction, ActionType } from "typesafe-actions";

/**
 * clear: 전부 제거
 * add: item 하나 추가
 * set: 배열 전체 설정
 * remove: 배열중 하나만 제거
 *
 * remainingTargets: 버려지지도 선택되지도 않은 타겟들 여기서 currentTarget 만든다.
 */

const SET_TITLE = "worldCup/set_title";
const SET_TARGETS = "worldCup/set_targets";
const SET_WINNER_ID = "worldCup/set_winner_id";
const SET_LEVEL = "worldCup/set_level";
const SET_CURRENT_TARGET_IDS = "worldCup/set_current_target_ids";
const SET_REMAINING_TARGET_IDS = "worldCup/set_remaining_target_ids";
const ADD_REMAINING_TARGET_IDS = "worldCup/add_remaining_target_ids";
const ADD_SELECTED_TARGET_IDS = "worldCup/add_selected_target_ids";
const REMOVE_REMAINING_TARGET_IDS = "worldCup/remove_remaining_target_ids";
const CLEAR_REMAINING_TARGET_IDS = "worldCup/clear_remaining_target_ids";
const CLEAR_CURRENT_TARGET_IDS = "worldCup/clear_current_target_ids";
const CLEAR_SELECTED_TARGET_IDS = "worldCup/clear_selected_target";

// action creators
const setTitle = createAction(SET_TITLE)<{ title: string }>();
const setTargets = createAction(SET_TARGETS)<{ targets: Target[] }>();
const setLevel = createAction(SET_LEVEL)<{ level: number }>();
const setWinnerId = createAction(SET_WINNER_ID)<{ targetId: number }>();
const setCurrentTargetIds =
  createAction(SET_CURRENT_TARGET_IDS)<{ currentTargetIds: [number, number] }>();
const setRemainingTargetIds = createAction(SET_REMAINING_TARGET_IDS)<{ targetIds: number[] }>();
const addRemainingTargetIds = createAction(ADD_REMAINING_TARGET_IDS)<{ targetId: number }>();
const addSelectedTargetIds = createAction(ADD_SELECTED_TARGET_IDS)<{ targetId: number }>();
const removeRemainingTargetIds = createAction(REMOVE_REMAINING_TARGET_IDS)<{ targetId: number }>();
const clearCurrentTargetIds = createAction(CLEAR_CURRENT_TARGET_IDS)();
const clearSelectedTargetIds = createAction(CLEAR_SELECTED_TARGET_IDS)();
const clearRemainingTargetIds = createAction(CLEAR_REMAINING_TARGET_IDS)();

const actions = {
  setTitle,
  setTargets,
  setLevel,
  setWinnerId,
  setCurrentTargetIds,
  setRemainingTargetIds,
  addRemainingTargetIds,
  addSelectedTargetIds,
  removeRemainingTargetIds,
  clearCurrentTargetIds,
  clearSelectedTargetIds,
  clearRemainingTargetIds,
};
export type WorldCupActions = ActionType<typeof actions>;

export default actions;
