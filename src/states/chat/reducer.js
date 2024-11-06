

import { ActionType } from './action';




function chatssReducer(chats = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CHATS:
      return action.payload.chats;
    case ActionType.ADD_CHATS:
      return action.payload.chat;
    default:
      return chats;
  }
}

export default chatssReducer;