import initialState from "./initialState";
import {
  CATEGORY_NAME_UPDATE,
  CATEGORY_REMOVE,
  PRODUCT_UPDATE,
  PRODUCT_REMOVE,
} from "../actions/actionTypes";

export default function reducer(state = initialState.products, action) {
  switch (action.type) {
    case CATEGORY_NAME_UPDATE:
      const { oldName, newName } = action.payload;

      return [
        ...state.map(product => {
          if (product.category === oldName) {
            product.category = newName;
          }
          return product;
        }),
      ];
    case CATEGORY_REMOVE:
      const { category: categoryRemoved } = action.payload;

      return [
        ...state.map(product => {
          if (product.parent === categoryRemoved.name) {
            product.parent = categoryRemoved.parent;
          }
          return product;
        }),
      ];
    case PRODUCT_UPDATE:
      const { code, product: data } = action.payload;

      return [
        ...state.map(product => {
          if (product.code === code) {
            return data;
          }
          return product;
        }),
      ];
    case PRODUCT_REMOVE:
      const { product: removedProduct } = action.payload;

      return [...state.filter(product => product.code !== removedProduct.code)];
    default:
      return state;
  }
}
