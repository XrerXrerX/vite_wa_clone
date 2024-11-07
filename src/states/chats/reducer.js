

import { ActionType } from './action';



function roomsReducer(rooms = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_ROOM:
    return action.payload.rooms;
  case ActionType.ADD_ROOM:
    return [action.payload.data, ...rooms]; // Add the new thread to the list
    // case ActionType.TOGGLE_LIKE_THREAD:

    //   return threads.map((thread) => {
    //     if (thread.id === action.payload.id) {
    //       const hasLiked = thread.upVotesBy.includes(action.payload.userId);
    //       return {
    //         ...thread,
    //         upVotesBy: hasLiked
    //           ? thread.upVotesBy.filter((userId) => userId !== action.payload.userId)
    //           : thread.upVotesBy.concat([action.payload.userId]),
    //         downVotesBy: thread.downVotesBy.filter((userId) => userId !== action.payload.userId),
    //       };
    //     }
    //     return thread;
    //   });
    // case ActionType.TOGGLE_DISLIKE_THREAD:
    //   return threads.map((thread) => {
    //     if (thread.id === action.payload.id) {
    //       const hasDisliked = thread.downVotesBy.includes(action.payload.userId);
    //       return {
    //         ...thread,
    //         downVotesBy: hasDisliked
    //           ? thread.downVotesBy.filter((userId) => userId !== action.payload.userId)
    //           : thread.downVotesBy.concat([action.payload.userId]),
    //         upVotesBy: thread.upVotesBy.filter((userId) => userId !== action.payload.userId),
    //       };
    //     }
    //     return thread;
    //   });
    // case ActionType.TOGGLE_NEUTRAL_THREAD:
    //   return threads.map((thread) => {

    //     if (thread.id === action.payload.id) {
    //       return {
    //         ...thread,
    //         downVotesBy: thread.downVotesBy.filter((userId) => userId !== action.payload.userId),
    //         upVotesBy: thread.upVotesBy.filter((userId) => userId !== action.payload.userId),
    //       };
    //     }
    //     return thread;
    //   });
  default:
    return rooms;
  }
}

export default roomsReducer;