import createReducer from "../Library/createReducer";
import * as types from "./../Actions/types";
import { initialState } from "./initialState";

export const userReducer = createReducer(initialState, {
  [types.SET_LOADER_STATUS](state, action) {
    return {
      ...state,
      isLoader: action.payload
    };
  },
  [types.SET_LOGIN_STATUS](state, action) {
    return {
      ...state,
      isLoggedIn: action.payload
    };
  },
  [types.SET_USER_DATA](state, action) {
    return {
      ...state,
      userData: action.payload
    };
  },

});