import initialState from "./initialState";
import {
  CATEGORY_NAME_UPDATE,
  CATEGORY_REMOVE,
  PRODUCT_UPDATE,
  PRODUCT_REMOVE,
  VAT_APPLY_VALUE_UPDATE,
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

    case VAT_APPLY_VALUE_UPDATE:
      const { categories, products, value } = action.payload;
      const categoriesNames = categories.map(category => category.name);
      const productsCodes = products.map(product => product.code);

      console.log(categories, products);
      return [
        ...state.map(product => {
          if (
            categoriesNames.indexOf(product.category) !== -1 ||
            productsCodes.indexOf(product.code) !== -1
          ) {
            product.vat = value;
          }
          return product;
        }),
      ]; //@TODO Apply vat value to products
    default:
      return state;
  }
}
