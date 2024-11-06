/**
 * @TODO: Define all the actions (creator) for the users state
 */
import Swal from 'sweetalert2';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ email, name, password }) {
  return async () => {
    try {
      const data = await api.register({ email, name, password });
      return data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'An error occurred during registration. Please try again.',
      });
      return 'fail registration';
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};