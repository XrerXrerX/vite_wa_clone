

import { ActionType } from './action';



function roomsReducer(rooms = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_ROOM:
      return action.payload.rooms;
    case ActionType.ADD_ROOM:
      return [action.payload.data, ...rooms]; // Add the new thread to the list
    default:
      return rooms;
  }
}

export default roomsReducer;