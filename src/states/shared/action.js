/**
 * @TODO: Define all the actions (creator) that uses a combination of actions from various domain
 */
import api from '../../utils/api';
import { receiveRoomsActionCreator } from '../chats/action';
// import { receiveUsersActionCreator } from '../users/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';


function asyncPopulateUsersAndRoom() {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading asyncPopulateUsersAndRoom

    try {
      const rooms = await api.getAllRooms();
      // const users = await api.getAllUsers();
      dispatch(receiveRoomsActionCreator(rooms));
      // dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message || 'Ups, something went wrong'); // Pastikan menggunakan error.message
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}

export { asyncPopulateUsersAndRoom };