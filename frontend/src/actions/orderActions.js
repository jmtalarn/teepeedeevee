import * as types from "./actionTypes";

export function addProduct(product) {
  return { type: types.ADD_PRODUCT, product };
}

export function removeProduct(product) {
  return { type: types.REMOVE_PRODUCT, product };
}
