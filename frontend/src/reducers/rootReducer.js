import { combineReducers } from "redux";
import order from "./orderReducer";
import locale from "./localeReducer";

const rootReducer = combineReducers({
  order,
  locale,
});

export default rootReducer;
