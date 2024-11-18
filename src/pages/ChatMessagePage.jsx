/** @format */

import React, { useEffect } from "react";
import ChatMessage from "../component/ChatMessage"; // Adjust the path based on your structure
// import Navbar from '../component/Navbar'; // Assuming the Navbar is in the same directory
import { asyncReceiveChats, toggleReceiveChats } from "../states/chat/action";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import echo from "../utils/ws";

// import socket from '../utils/socket'; // Import the socket instance

function ChatMessagePage() {
  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser); // Get specific slice of state
  const chats = useSelector((state) => state.chats); // Get specific slice of state
  const dispatch = useDispatch(); // @TODO: get dispatch function from store
  console.log(chats);
  useEffect(() => {
    dispatch(asyncReceiveChats(id));

    // Cleanup untuk unsubscribe dari channel
    return () => {
      echo.leave(`channel-name-${id}`);
      console.log(`Keluar dari WebSocket channel: channel-name-${id}`);
      echo.channel(`channel-name-${id}`).listen(".get.messages", (chats) => {
        // console.log("Pesan diterima melalui WebSocket:", chats);
        // Saat menerima pesan baru, update state Redux
        // console.log(chats.dataMessages);
        dispatch(toggleReceiveChats(chats.dataMessages));
      });
    };
  }, [dispatch, id]);

  return (
    <div>
      <ChatMessage currentUser={authUser} messages={chats} />
    </div>
  );
}

export default ChatMessagePage;
