import { combineReducers } from "redux";
import order from "./orderReducer";
import locale from "./localeReducer";
import categories from "./categoriesReducer";

const rootReducer = combineReducers({
  order,
  locale,
  categories,
});

export default rootReducer;
