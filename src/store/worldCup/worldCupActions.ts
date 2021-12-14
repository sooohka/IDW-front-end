import { ActionType, createAction } from "typesafe-actions";
import { WorldCupReducer } from "./types";

const INITIALIZE_WORLDCUP = "worldCup/initialize_worldcup";
const FINISH_CURRENT_LEVEL = "worldCup/finish_current_level";
const SELECT_TARGET = "worldCup/selectTaraget";
const SET_WINNER_ID = "worldCup/set_winner_id";
const SET_CURRENT_TARGET_IDS = "worldCup/set_current_target_ids";
const RESET = "worldCup/reset";

// action creators
const initializeWorldCup =
  createAction(INITIALIZE_WORLDCUP)<Pick<WorldCupReducer, "level" | "targets" | "title">>();
const finishCurrentLevel = createAction(FINISH_CURRENT_LEVEL)();
const selectTarget = createAction(SELECT_TARGET)<{ targetId: number }>();
const setWinnerId = createAction(SET_WINNER_ID)<{ targetId: number }>();
const setCurrentTargetIds = createAction(SET_CURRENT_TARGET_IDS)();

const reset = createAction(RESET)();

const actions = {
  initializeWorldCup,
  finishCurrentLevel,
  selectTarget,
  setWinnerId,
  setCurrentTargetIds,
  reset,
};

export type WorldCupActions = ActionType<typeof actions>;

export default actions;
