import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxLogger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";
import { Action } from "typesafe-actions";
import worldCupReducer from "./worldCup";
import { WorldCupActions } from "./worldCup/worldCupActions";

const rootReducer = combineReducers({ worldCupState: worldCupReducer });

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, applyMiddleware(thunk, reduxLogger))
    : createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
type AppActions = WorldCupActions;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export default store;
