import initialState from "./initialState";
import { SWITCH_LOCALE } from "../actions/actionTypes";

export default function reducer(state = initialState.locale, action) {
  switch (action.type) {
    case SWITCH_LOCALE:
      return action.locale;
    default:
      return state;
  }
}
