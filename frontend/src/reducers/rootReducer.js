import { combineReducers } from "redux";
import order from "./orderReducer";

const rootReducer = combineReducers({
  order,
});

export default rootReducer;
