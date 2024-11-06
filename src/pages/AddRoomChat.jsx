import React from 'react';
import AddRoom from '../component/AddRoom'; // Assuming the Navbar is in the same directory
import { asyncAddRoom } from '../states/chats/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';

function AddRoomChat() {
  const navigate = useNavigate(); // Mendapatkan fungsi navigate

  const dispatch = useDispatch(); // initialize useDispatch

  const onAddRoom = ({ nameroom, maxMem }) => {
    try {
      dispatch(asyncAddRoom({
        name: nameroom,
        max_members: maxMem,
      })); // dispatch async action to add thread
      navigate('/'); // Arahkan ke halaman home

      // Tampilkan SweetAlert setelah redirect
      Swal.fire({
        title: 'Berhasil!',
        text: 'Konten berhasil ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error adding thread:', error);
      // Anda bisa menambahkan penanganan error di sini jika perlu
    }
  };

  return (
    <div>
      <AddRoom addRoom={onAddRoom} />
    </div>
  );
}

export default AddRoomChat;
