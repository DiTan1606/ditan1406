// src/components/MobileHeader.js  (updated dùng useNav)
import React, { useContext } from 'react';
import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthContext } from '../contexts/AuthContext';
import { useNav } from '../hooks/useNav';

const MobileHeader = ({ onNavClick }) => {
  const { currentUser } = useContext(AuthContext);
  const { isActive } = useNav();
  const username = currentUser?.displayName || 'User';

  return (
    <Box className="mobile-header">
      <Box
        className="logo"
        onClick={() => onNavClick('home')}
        sx={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: 'bold' }}
      >
        {username}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onNavClick('notifications')}
          sx={{ color: isActive('notifications') ? '#fff' : '#aaa' }}
        >
          <NotificationsIcon />
        </IconButton>
        <IconButton
          onClick={() => onNavClick('chat')}
          sx={{ color: isActive('chat') ? '#fff' : '#aaa' }}
        >
          <ChatIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileHeader;