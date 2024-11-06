import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './component/Navbar'; // Assuming the Navbar is in the same directory
import Loading from './component/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomChatPage from './pages/RoomChatPage';
import AddRoomChat from './pages/AddRoomChat';
import ChatMessagePage from './pages/ChatMessagePage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';


function App() {
  //strict mode agar detail
  const authUser = useSelector((state) => state.authUser); // Get specific slice of state
  const isPreload = useSelector((state) => state.isPreload); // Get specific slice of state

  const dispatch = useDispatch(); // @TODO: get dispatch function from store
  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    // @TODO: dispatch async action to sign out
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        {/* @TODO: use react-redux-loading-bar to show loading bar */}
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  const roomData = {
    roomName: 'Back to home',
  };

  return (
    <>
      <Loading />
      <div>
        {/* @TODO: use react-redux-loading-bar to show loading bar */}

        <Navbar
          roomName={roomData.roomName} totalMembersOnline={roomData.totalMembersOnline}
          authUser={authUser} signOut={onSignOut} />
        <main>
          <Routes>
            <Route path="/" element={<RoomChatPage />} />
            <Route path="/add-room" element={<AddRoomChat />} />
            <Route path="/roomid/:id" element={<ChatMessagePage />} />
          </Routes>
        </main>
      </div>

    </>
  );
}

export default App;
