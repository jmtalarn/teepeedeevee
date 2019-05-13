import initialState from "./initialState";
import {
  CATEGORY_PARENT_UPDATE,
  CATEGORY_NAME_UPDATE,
} from "../actions/actionTypes";

export default function reducer(state = initialState.categories, action) {
  switch (action.type) {
    case CATEGORY_PARENT_UPDATE:
      const { categoryName, parent } = action.payload;
      return [
        ...state.map(category => {
          if (category.name === categoryName) {
            category.parent = parent;
          }
          return category;
        }),
      ];
    case CATEGORY_NAME_UPDATE:
      const { oldName, newName } = action.payload;

      return [
        ...state.map(category => {
          if (category.name === oldName) {
            category.name = newName;
          }
          if (category.parent === oldName) {
            category.parent = newName;
          }
          return category;
        }),
      ];
    default:
      return state;
  }
}
