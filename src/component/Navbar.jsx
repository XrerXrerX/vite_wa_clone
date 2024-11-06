import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import { asyncReceiveUser, asyncadduserroom } from '../states/userlist/action';
import { useSelector, useDispatch } from 'react-redux';

function Navbar({ roomName, signOut }) {
  const listusers = useSelector((state) => state.listusers); // Get the list of users from Redux store
  const authUser = useSelector((state) => state.authUser); // Get the list of users from Redux store



  const location = useLocation();
  const roomId = location.pathname.split('/').pop(); // Split by "/" and take the last part
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUser()); // Dispatch action to get users list from API or other source
  }, [dispatch]);

  const isRoomChat = /^\/roomid\/\d+$/.test(location.pathname) || location.pathname === '/add-room';

  // Handle opening and closing of the dropdown
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // New function to handle user click and pass user.id
  const handleUserClick = (userId, roomId) => {
    dispatch(asyncadduserroom(userId, roomId)); // Dispatch the action with both userId and authUser
    handleClose(); // Close the menu after selecting a user
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#4C2718', width: '100%', top: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isRoomChat ? (
            <>
              <IconButton color="inherit" onClick={() => navigate('/')}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 1 }}>{roomName}</Typography>
            </>
          ) : (
            <Typography variant="h6">CloneWaByKi</Typography>
          )}
        </Box>

        {/* Center section */}
        {isRoomChat ? (
          <Typography variant="body1">Room Chat</Typography>
        ) : (
          <Button color="inherit" component={Link} to="/add-room" startIcon={<AddIcon />}>
            Create Room
          </Button>
        )}

        {/* Right section */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isRoomChat ? (
            <>
              <IconButton color="inherit" onClick={handleClick}>
                <AddIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* Loop through the listusers to create the dropdown list */}
                {listusers.map((user) => (
                  <MenuItem key={user.id} onClick={() => handleUserClick(user.id, roomId)}>
                    {user.name} {/* Display user name */}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button color="inherit" type="button" onClick={signOut}>
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
