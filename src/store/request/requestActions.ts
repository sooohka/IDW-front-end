import { createAction, ActionType } from "typesafe-actions";

const START_REQUEST = "request/start_request";
const END_REQUEST = "request/en_request";
const FAIL_REQUEST = "request/fail_request";

const startRequest = createAction(START_REQUEST)<{ url: string }>();
const endRequest = createAction(END_REQUEST)<{ url: string }>();
const failRequest = createAction(FAIL_REQUEST)<{ url: string; error: Error | null }>();

const actions = { startRequest, endRequest, failRequest };
export type RequestActions = ActionType<typeof actions>;

export default actions;
