// src/components/MobileHeader.js
import React, { useContext } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const MobileHeader = ({ onNavClick }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const username = currentUser?.displayName || 'User';

  const isActive = (path) => location.pathname === path;

  return (
    <Box className="mobile-header">
      {/* LOGO */}
      <Box
        className="logo"
        onClick={() => onNavClick('home')}
        sx={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: 'bold' }}
      >
        {username}
      </Box>

      {/* ICONS */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip>
          <IconButton
            onClick={() => onNavClick('notifications')}
            sx={{ color: isActive('/mobile/notifications') ? '#fff' : '#aaa' }}
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip>
          <IconButton
            onClick={() => onNavClick('chat')}
            sx={{ color: isActive('/chat') ? '#fff' : '#aaa' }}
          >
            <ChatIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MobileHeader;