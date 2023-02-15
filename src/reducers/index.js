import { combineReducers } from "redux";

import authReducer from "./AuthReducers";
import postReducer from "./PostReducers";
import timelinePostReducer from "./TimelinePostReducer";
import chatReducer from "./ChatReducers";
export const reducers = combineReducers({authReducer , postReducer , timelinePostReducer , chatReducer});