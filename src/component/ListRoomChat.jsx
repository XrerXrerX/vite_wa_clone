import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// RoomItem Component - displays individual room details
function RoomItem({ room }) {
  const navigate = useNavigate();
  const onTalkClick = () => {
    navigate(`/roomid/${room.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#2B1B0A',
        borderRadius: 1,
        marginBottom: 1,
        color: '#FFE9DC',
        border: '1px solid #FFE9DC',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onTalkClick}
    >
      {/* Room name and owner */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {room.name}
        </Typography>
        <Typography variant="body2" color="lightgray">
          Owner: {room.owner}
        </Typography>
      </Box>

      {/* Room details: total members and online count */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2" color="lightgreen">
          Total Members: {room.members.length}
        </Typography>
      </Box>
    </Box>
  );
}

// Define prop types for RoomItem component
RoomItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,            // Add id validation
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,         // Add owner validation
    members: PropTypes.arrayOf(PropTypes.number).isRequired,  // Array of member IDs
  }).isRequired,
};

// Main Landing component
function ListRoomChat({ roomss }) {
  return (
    <Box
      sx={{
        width: '50%',
        backgroundColor: '#301900',
        color: '#FFE9DC',
        padding: 2,
        margin: 'auto',
        borderRadius: 2,
        boxShadow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Chat Rooms
      </Typography>

      {/* Room list */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginBottom: 2,
          color: '#FFE9DC',
        }}
      >
        {roomss.map((room, index) => (
          <RoomItem key={index} room={room} />
        ))}
      </Box>
    </Box>
  );
}

// Define prop types for the ListRoomChat component
ListRoomChat.propTypes = {
  roomss: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,          // Add id validation
      name: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,       // Add owner validation
      members: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default ListRoomChat;
