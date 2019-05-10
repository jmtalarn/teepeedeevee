import * as types from "./actionTypes";

export function switchLocale(locale) {
  return { type: types.SWITCH_LOCALE, locale };
}
