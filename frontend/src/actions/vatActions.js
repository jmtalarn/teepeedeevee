import * as types from "./actionTypes";

export function vatApplyValueUpdate(categories, products, value) {
  return {
    type: types.VAT_APPLY_VALUE_UPDATE,
    payload: { categories, products, value },
  };
}
