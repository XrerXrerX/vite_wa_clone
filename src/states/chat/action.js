/**
 * @TODO: Define all the actions (creator) for the talks state
 */


import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';


const ActionType = {
  RECEIVE_CHATS: 'RECEIVE_CHATS',
  ADD_CHATS: 'ADD_CHATS',
};


function toggleReceiveChats(chats) {
  return {
    type: ActionType.RECEIVE_CHATS,
    payload: {
      chats,
    },
  };
}

function toggleAddChats(chat) {
  return {
    type: ActionType.ADD_CHATS,
    payload: {
      chat,
    },
  };
}

function asyncAddChat({ message_text, attachment_url, chatroom_id }) {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar
    try {
      await api.addChat({
        message_text, attachment_url, chatroom_id
      });

      const chat = await api.getAllChats(chatroom_id);
      dispatch(toggleAddChats(chat));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}


function asyncReceiveChats(id) {
  return async (dispatch) => {
    dispatch(showLoading()); // Starts the loading bar

    try {
      const chats = await api.getAllChats(id);
      dispatch(toggleReceiveChats(chats));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading()); // Stops the loading bar

  };
}

export {
  ActionType,
  toggleReceiveChats,
  asyncReceiveChats,
  toggleAddChats,
  asyncAddChat,
};