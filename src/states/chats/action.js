/**
 * @TODO: Define all the actions (creator) for the talks state
 */


import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_ROOM: 'RECEIVE_ROOM',
  ADD_ROOM: 'ADD_ROOM',

};

function receiveRoomsActionCreator(rooms) {
  return {
    type: ActionType.RECEIVE_ROOM,
    payload: {
      rooms,
    },
  };
}


function addroomActionCreator(data) {
  return {
    type: ActionType.ADD_ROOM,
    payload: {
      data,
    },
  };
}


function asyncAddRoom({ name, max_members }) {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar

    try {
      const data = await api.addRoom({ name, max_members });
      dispatch(addroomActionCreator(data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}




export {
  ActionType,
  receiveRoomsActionCreator,
  addroomActionCreator,
  asyncAddRoom,

};