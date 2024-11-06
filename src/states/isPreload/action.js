/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action'; // Ensure correct path
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
  SET_ERROR: 'SET_ERROR',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: {
      error,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
      dispatch(setErrorActionCreator(error.message)); // Dispatch the error message

    } finally {
      dispatch(setIsPreloadActionCreator(false)); // Mark preloading as finished
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  setErrorActionCreator, // Export the error action creator
  asyncPreloadProcess,
};