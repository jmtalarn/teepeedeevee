import initialState from "./initialState";
import { CATEGORY_NAME_UPDATE } from "../actions/actionTypes";

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
    default:
      return state;
  }
}
