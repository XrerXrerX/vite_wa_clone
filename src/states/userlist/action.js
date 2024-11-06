/**
 * @TODO: Define all the actions (creator) for the talks state
 */


import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';


const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
  ADD_USER_ROOM: 'ADD_USER_ROOM',
};


function toggleReceiveUsers(user) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      user,
    },
  };
}
function toggleaddroomUsers(user) {
  return {
    type: ActionType.ADD_USER_ROOM,
    payload: {
      user,
    },
  };
}
function asyncReceiveUser() {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar

    try {
      const user = await api.getalllistuser();
      dispatch(toggleReceiveUsers(user));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}
function asyncadduserroom(userId, id) {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar

    try {
      const user = await api.adduserroom(userId, id);
      dispatch(toggleaddroomUsers(user));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}

export {
  ActionType,
  toggleReceiveUsers,
  asyncReceiveUser,
  asyncadduserroom,
};