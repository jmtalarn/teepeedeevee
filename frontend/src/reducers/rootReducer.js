import { combineReducers } from "redux";
import order from "./orderReducer";
import locale from "./localeReducer";
import categories from "./categoriesReducer";
import products from "./productsReducer";

const rootReducer = combineReducers({
  order,
  locale,
  categories,
  products,
});

export default rootReducer;
