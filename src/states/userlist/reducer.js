

import { ActionType } from './action';




function chatssReducer(listusers = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USER:
      return action.payload.user;
    default:
      return listusers;
  }
}

export default chatssReducer;