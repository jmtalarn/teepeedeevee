import initialState from "./initialState";
import {
  CATEGORY_PARENT_UPDATE,
  CATEGORY_NAME_UPDATE,
  CATEGORY_REMOVE,
  CATEGORY_CREATE,
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
    case CATEGORY_REMOVE:
      const { category: categoryRemoved } = action.payload;

      return state
        .map(category => {
          if (category.parent === categoryRemoved.name) {
            category.parent = categoryRemoved.parent;
          }
          return category;
        })
        .reduce((acc, curr) => {
          if (curr.name !== categoryRemoved.name) {
            acc.push(curr);
          }
          return acc;
        }, []);
    case CATEGORY_CREATE:
      const { category } = action.payload;
      return [{ name: category, parent: null }, ...state];
    default:
      return state;
  }
}
