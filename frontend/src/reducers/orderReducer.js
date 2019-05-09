import initialState from "./initialState";
import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions/actionTypes";

export default function stuff(state = initialState.order, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const { product: addedProduct } = action;
      let orderedProduct = state.find(
        orderedProduct => orderedProduct.product.code === addedProduct.code,
      );
      if (orderedProduct) {
        orderedProduct.quantity++;
      } else {
        orderedProduct = { product: addedProduct, quantity: 1 };
        state.push(orderedProduct);
      }
      return [...state];
    case REMOVE_PRODUCT:
      const { product: removedProduct } = action;

      const index = state.findIndex(orderedProduct => {
        return orderedProduct.product.code === removedProduct.code;
      });
      if (state[index].quantity > 1) {
        state[index].quantity--;
      } else {
        state.splice(action.index, 1);
      }

      return [...state];
    default:
      return state;
  }
}
