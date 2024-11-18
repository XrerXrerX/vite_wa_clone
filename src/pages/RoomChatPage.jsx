import React, { useEffect } from 'react';
// import Navbar from '../component/Navbar'; // Assuming the Navbar is in the same directory
import ListRoomChat from '../component/ListRoomChat'; // Assuming the Navbar is in the same directory
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndRoom } from '../states/shared/action';
// import { asyncAddTalk, asyncToogleLikeTalk } from '../states/talks/action';




function ThreadPage() {
  const rooms = useSelector((state) => state.rooms); // Get specific slice of state
  const authUser = useSelector((state) => state.authUser); // Get specific slice of state

  const dispatch = useDispatch(); // @TODO: get dispatch function from store
  useEffect(() => {
    // @TODO: dispatch async action to populate threads and users data
    dispatch(asyncPopulateUsersAndRoom());
  }, [dispatch]);





  const roomss = rooms
    .filter((room) => room.members.includes(authUser.id))
    .map((room) => ({
      ...room,
      authuser_name: authUser.name
    }));

  return (
    <div>
      <ListRoomChat roomss={roomss} />
    </div>
  );
}

export default ThreadPage;
