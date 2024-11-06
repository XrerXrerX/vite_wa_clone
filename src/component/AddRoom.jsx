import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import useInput from '../hooks/useInput';


function AddRoom({ addRoom }) {
  const [nameroom, onNameRoomChange] = useInput('');
  const [maxMem, onMaxMemChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoom({ nameroom, maxMem });
  };



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
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create a New Room Chat
      </Typography>
      <Divider sx={{ marginBottom: 2, borderColor: '#FFFFFF' }} />

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Input Name Room Chat"
          variant="outlined"
          name="nameroom"
          value={nameroom}
          onChange={onNameRoomChange}
          sx={{ marginBottom: 2, backgroundColor: '#fff' }}
          required
        />
        <TextField
          fullWidth
          label="Set Max group members"
          variant="outlined"
          name="maxMem"
          value={maxMem}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || (Number(value) <= 50 && Number(value) >= 1)) {
              onMaxMemChange(e);
            }
          }}
          type="number"
          inputProps={{ min: 1, max: 50 }}
          sx={{ marginBottom: 2, backgroundColor: '#fff' }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#5C3B00', color: '#FFE9DC' }}
        >
          Add New ROomChat
        </Button>
      </form>
    </Box>
  );
}

AddRoom.propTypes = {
  addRoom: PropTypes.func.isRequired,
};

export default AddRoom;
