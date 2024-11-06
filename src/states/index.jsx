import { configureStore } from '@reduxjs/toolkit';

import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import chatssReducer from './chat/reducer';
import roomsReducer from './chats/reducer';
import listusers from './userlist/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    rooms: roomsReducer,
    chats: chatssReducer,
    listusers: listusers,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable check
      serializableCheck: false, // You can also disable serializable check if needed
    }),
});


export default store;