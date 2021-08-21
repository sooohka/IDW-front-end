import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";

const rootReducer = combineReducers({ s: () => ({}) });
const store = createStore(rootReducer, applyMiddleware(reduxLogger));

export default store;
