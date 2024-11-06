import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import PropTypes from 'prop-types';
import ChatBubble from '../component/ChatBubble'; // Adjust the path based on your structure
import { asyncAddChat } from '../states/chat/action';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


function ChatMessage({ currentUser, messages }) {
  const { id } = useParams();

  const [newMessage, setNewMessage] = useState(''); // Manage message input directly
  const [selectedFile, setSelectedFile] = useState(null); // Manage file input directly
  const [filePreview, setFilePreview] = useState(null); // Manage file preview

  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Scroll to the bottom when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      // Generate preview for images and videos
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null); // For non-previewable files, only show filename
      }
    } else {
      setFilePreview(null);
    }
  };

  const handleSendMessage = () => {
    if (newMessage || selectedFile) {
      // Dispatch message with user ID and selected file
      dispatch(asyncAddChat({
        message_text: newMessage,
        attachment_url: selectedFile,
        chatroom_id: id,
      }));

      // Clear input fields after sending
      setNewMessage('');
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  return (
    <Box
      sx={{
        width: '50%',
        height: '100vh',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9F9F9',
      }}
    >
      {/* Chat Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
        }}
      >
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} isOwnMessage={message.sender_id.id === currentUser.id} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Sticky Input Area */}
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #DDD',
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 1,
          flexDirection: 'column',
        }}
      >
        {/* Preview Section */}
        {selectedFile && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            {filePreview && selectedFile.type.startsWith('image/') && (
              <img src={filePreview} alt="Preview" style={{ width: 100, height: 'auto' }} />
            )}
            {filePreview && selectedFile.type.startsWith('video/') && (
              <video controls src={filePreview} style={{ width: 100, height: 'auto' }} />
            )}
            {!filePreview && (
              <Typography variant="body2">{selectedFile.name}</Typography>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <IconButton component="label" color="primary" sx={{ marginRight: 1 }}>
            <AttachFile />
            <input type="file" hidden onChange={handleFileChange} />
          </IconButton>
          <TextField
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
            <Send />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

ChatMessage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,

};

export default ChatMessage;
