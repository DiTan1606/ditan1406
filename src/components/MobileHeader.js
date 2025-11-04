// src/components/MobileHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const MobileHeader = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = currentUser?.displayName || 'User';

  return (
    <Box className="mobile-header">
      <Typography className="logo">{username}</Typography>
      <Box className="icons">
        <NotificationsIcon onClick={() => navigate('/notifications')} />
        <ChatIcon onClick={() => navigate('/chat')} />
      </Box>
    </Box>
  );
};

export default MobileHeader;