import { ActionType, createAction } from "typesafe-actions";

const INITIALIZE = "worldCup/initialize";
const FINISH_CURRENT_LEVEL = "worldCup/finishCurrentLevel";
const SELECT_TARGET = "worldCup/selectTarget";
const SET_WINNER_ID = "worldCup/set_winner_id";
const SET_CURRENT_TARGET_IDS = "worldCup/set_current_target_ids";
const RESET = "worldCup/reset";

// action creators
const initialize = createAction(INITIALIZE)<{ targets: Target[]; title: string; level: number }>();
const finishCurrentLevel = createAction(FINISH_CURRENT_LEVEL)();
const selectTarget = createAction(SELECT_TARGET)<{ selectedTargetId: number }>();
const setWinnerId = createAction(SET_WINNER_ID)<{ targetId: number }>();
const setCurrentTargetIds =
  createAction(SET_CURRENT_TARGET_IDS)<{ currentTargetIds: [number, number] }>();
const reset = createAction(RESET)();

const actions = {
  initialize,
  finishCurrentLevel,
  selectTarget,
  setWinnerId,
  setCurrentTargetIds,
  reset,
};
export type WorldCupActions = ActionType<typeof actions>;

export default actions;
