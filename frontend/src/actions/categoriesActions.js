import * as types from "./actionTypes";

export function updateParentCategory(categoryName, parent) {
  return {
    type: types.CATEGORY_PARENT_UPDATE,
    payload: { categoryName, parent },
  };
}
export function updateCategoryName(oldName, newName) {
  return {
    type: types.CATEGORY_NAME_UPDATE,
    payload: { oldName, newName },
  };
}
export function removeCategory(category) {
  return {
    type: types.CATEGORY_REMOVE,
    payload: { category },
  };
}
export function createCategory(category) {
  return {
    type: types.CATEGORY_CREATE,
    payload: { category },
  };
}
