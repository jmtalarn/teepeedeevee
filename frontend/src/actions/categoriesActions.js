import * as types from "./actionTypes";

export function updateCategory(prev, next) {
  return { type: types.CATEGORY_UPDATE, prev, next };
}
