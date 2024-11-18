import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

// Sample ChatBubble Component
function ChatBubble({ message, isOwnMessage }) {

  const isImage = message.attachment_url && message.attachment_url.match(/\.(jpeg|jpg|gif|png)$/i);
  const isVideo = message.attachment_url && message.attachment_url.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginBottom: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          padding: 1.5,
          borderRadius: 2,
          backgroundColor: isOwnMessage ? '#E1F5FE' : '#F0F0F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          textAlign: isOwnMessage ? 'right' : 'left',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {message.sender_id.name} - {postedAt(message.created_at)}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {message.message_text}
        </Typography>

        {/* Check if there's an attachment URL and render the image */}
        {message.attachment_url && (
          <Box
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: '100%',
              maxHeight: '300px',
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            {isImage ? (
              <img
                src={message.attachment_url}
                alt="attachment"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain', // Ensure the image fits inside the box
                }}
              />
            ) : isVideo ? (
              <video
                controls
                src={message.attachment_url}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain', // Ensure the video fits inside the box
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : null}
          </Box>
        )}
      </Box>
    </Box>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    sender_id: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    message_text: PropTypes.string, // Add this line
    attachment_url: PropTypes.string,
    created_at: PropTypes.string.isRequired, // Add this line
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
};

export default ChatBubble;
