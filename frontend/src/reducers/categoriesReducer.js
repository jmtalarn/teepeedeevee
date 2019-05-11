import initialState from "./initialState";
import { CATEGORY_UPDATE } from "../actions/actionTypes";

export default function reducer(state = initialState.categories, action) {
  switch (action.type) {
    case CATEGORY_UPDATE:
      return state.map(category =>
        category.name === action.prev.name ? action.next : category,
      );
    default:
      return state;
  }
}
