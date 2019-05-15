import * as types from "./actionTypes";

export function productUpdate(code, product) {
  return { type: types.PRODUCT_UPDATE, payload: { code, product } };
}
export function productRemove(product) {
  return { type: types.PRODUCT_REMOVE, payload: { product } };
}
