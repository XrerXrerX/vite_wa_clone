import React, { useEffect } from 'react';
import ChatMessage from '../component/ChatMessage'; // Adjust the path based on your structure
// import Navbar from '../component/Navbar'; // Assuming the Navbar is in the same directory
import { asyncReceiveChats } from '../states/chat/action';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import socket from '../utils/socket'; // Import the socket instance


function ChatMessagePage() {

  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser); // Get specific slice of state
  const chats = useSelector((state) => state.chats); // Get specific slice of state
  const dispatch = useDispatch(); // @TODO: get dispatch function from store


  useEffect(() => {
    dispatch(asyncReceiveChats(id));
  }, [dispatch, id]);


  return (
    <div>
      <ChatMessage
        currentUser={authUser} messages={chats}
      />
    </div>
  );
}

export default ChatMessagePage;
