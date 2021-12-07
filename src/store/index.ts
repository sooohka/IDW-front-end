import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxLogger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";
import worldCupReducer from "./worldCup";
import { WorldCupActions } from "./worldCup/worldCupActions";
import { RequestActions } from "./request/requestActions";
import requestReducer from "./request";

const rootReducer = combineReducers({
  worldCupState: worldCupReducer,
  requestState: requestReducer,
});

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, applyMiddleware(thunk, reduxLogger))
    : createStore(rootReducer, applyMiddleware(thunk));

type AppActions = WorldCupActions | RequestActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export default store;
