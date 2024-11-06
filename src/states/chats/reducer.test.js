/**
* test scenario for threadsReducer
*
* - threadReducers function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREAD action
*  - should return null when given by CLEAR_THREAD action
*  - should return new thrad when given by ADD_THREAD action
*  - should return the threads with the toggled like , dislike , neutral thread when given by TOGGLE_LIKE_THREAD, TOGGLE_DISLIKE_THREAD,TOGGLE_NEUTRAL_THREAD action
*
*/


import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const unknownAction = { type: 'UNKNOWN' };

    // Action
    const nextState = threadsReducer(initialState, unknownAction);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given the RECEIVE_THREAD action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREAD,
      payload: {
        threads: [{ id: '1', content: 'Thread 1' }, { id: '2', content: 'Thread 2' }],
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given the ADD_THREAD action', () => {
    // Arrange
    const initialState = [{ id: '1', content: 'Thread 1' }];
    const newThread = { id: '2', content: 'New Thread' };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should return the threads with the toggled like on a thread when given the TOGGLE_LIKE_THREAD action', () => {
    // Arrange
    const initialState = [
      { id: '1', upVotesBy: ['user1'], downVotesBy: [], content: 'Thread 1' },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: { id: '1', userId: 'user2' },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].upVotesBy).toContain('user2');
    expect(nextState[0].downVotesBy).not.toContain('user2');
  });

  it('should return the threads with the toggled dislike on a thread when given the TOGGLE_DISLIKE_THREAD action', () => {
    // Arrange
    const initialState = [
      { id: '1', upVotesBy: [], downVotesBy: ['user1'], content: 'Thread 1' },
    ];
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: { id: '1', userId: 'user2' },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].downVotesBy).toContain('user2');
    expect(nextState[0].upVotesBy).not.toContain('user2');
  });

  it('should return the threads with the neutralized votes on a thread when given the TOGGLE_NEUTRAL_THREAD action', () => {
    // Arrange
    const initialState = [
      { id: '1', upVotesBy: ['user1'], downVotesBy: ['user2'], content: 'Thread 1' },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_THREAD,
      payload: { id: '1', userId: 'user1' },
    };
    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].upVotesBy).not.toContain('user1');
    expect(nextState[0].downVotesBy).toContain('user2');
  });
});
