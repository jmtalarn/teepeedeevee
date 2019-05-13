import * as types from "./actionTypes";

export function addProduct(product) {
  return { type: types.ORDER_ADD_PRODUCT, product };
}
export function removeUnitProduct(product) {
  return { type: types.ORDER_REMOVE_UNIT, product };
}
export function removeProduct(product) {
  return { type: types.ORDER_REMOVE_PRODUCT, product };
}
