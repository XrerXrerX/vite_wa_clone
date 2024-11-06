/**
* test scenario for threadsDetailReducer
*
* - threadReducers function
*  - should return the initial state when given by unknown action
*  - should return the detail threads when given by RECEIVE_THREAD_DETAIL action
*  - should return the comment with the new comment when given by ADD_COMMENT action
*  - should return null when given by CLEAR_THREAD_DETAIL action
*  - should return the threads with the toggled like , dislike , neutral thread when given by TOGGLE_LIKE_COMMENT, TOGGLE_DISLIKE_COMMENT,TOGGLE_NEUTRAL_COMMENT action
*
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = null;
    const unknownAction = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, unknownAction);

    // Assert
    expect(nextState).toBe(initialState);
  });

  it('should return the thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: { id: '1', content: 'Thread detail content', upVotesBy: [], downVotesBy: [], comments: [] },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should add a comment when given ADD_COMMENT action', () => {
    // Arrange
    const initialState = { id: '1', content: 'Thread content', comments: [] };
    const newComment = { id: '101', content: 'New comment' };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { content: newComment },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(newComment);
  });

  it('should clear the thread detail when given CLEAR_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = { id: '1', content: 'Thread content' };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should toggle like on thread detail when given TOGGLE_LIKE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: '1',
      upVotesBy: ['user1'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
      payload: { id: '1', userId: 'user2' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.upVotesBy).toContain('user2');
    expect(nextState.downVotesBy).not.toContain('user2');
  });

  it('should toggle dislike on thread detail when given TOGGLE_DISLIKE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: '1',
      upVotesBy: [],
      downVotesBy: ['user1'],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD_DETAIL,
      payload: { id: '1', userId: 'user2' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.downVotesBy).toContain('user2');
    expect(nextState.upVotesBy).not.toContain('user2');
  });

  it('should toggle neutral on thread detail when given TOGGLE_NEUTRAL_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: '1',
      upVotesBy: ['user1'],
      downVotesBy: ['user2'],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_THREAD_DETAIL,
      payload: { id: '1', userId: 'user1' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.upVotesBy).not.toContain('user1');
    expect(nextState.downVotesBy).toContain('user2');
  });

  it('should toggle like on comment when given TOGGLE_LIKE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: '1',
      comments: [{ id: '101', upVotesBy: [], downVotesBy: [], content: 'Comment content' }],
    };
    const action = {
      type: ActionType.TOGGLE_LIKE_COMMENT,
      payload: { CommentId: '101', userId: 'user2' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.comments[0].upVotesBy).toContain('user2');
  });

  it('should toggle dislike on comment when given TOGGLE_DISLIKE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: '1',
      comments: [{ id: '101', upVotesBy: [], downVotesBy: ['user1'], content: 'Comment content' }],
    };
    const action = {
      type: ActionType.TOGGLE_DISLIKE_COMMENT,
      payload: { CommentId: '101', userId: 'user2' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.comments[0].downVotesBy).toContain('user2');
    expect(nextState.comments[0].upVotesBy).not.toContain('user2');
  });

  it('should neutralize votes on comment when given TOGGLE_NEUTRAL_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: '1',
      comments: [{ id: '101', upVotesBy: ['user1'], downVotesBy: ['user2'], content: 'Comment content' }],
    };
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_COMMENT,
      payload: { CommentId: '101', userId: 'user1' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.comments[0].upVotesBy).not.toContain('user1');
    expect(nextState.comments[0].downVotesBy).toContain('user2');
  });
});
