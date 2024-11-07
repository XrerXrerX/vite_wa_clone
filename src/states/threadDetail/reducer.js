/**
 * @TODO: Define reducer for the talkDetail state
 */

import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.ADD_COMMENT:
    return action.payload.content;
  case ActionType.CLEAR_CHAT_DETAIL:
    return null;



  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
