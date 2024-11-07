/**
 * @TODO: Define reducer for the isPreLoad state
 */


import { ActionType } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
  case ActionType.SET_ERROR:
    return action.payload.error; // Store the error message
  case ActionType.SET_IS_PRELOAD:
    return action.payload.isPreload;
  default:
    return isPreload;
  }
}

export default isPreloadReducer;