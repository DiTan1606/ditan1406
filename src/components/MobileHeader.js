// src/components/MobileHeader.js
import React, { useContext } from 'react';
import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/FavoriteBorderRounded';  // Đổi icon theo code mới của bạn
import ChatIcon from '@mui/icons-material/SendRounded';
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
          className={isActive('notifications') ? 'active' : ''}  // Thêm class cho CSS
          onClick={() => onNavClick('notifications')}
          sx={{ color: isActive('notifications') ? '#fff !important' : '#aaa !important' }}  // Thêm !important để force color
        >
          <NotificationsIcon sx={{ color: 'inherit' }} /> 
        </IconButton>
        <IconButton
          className={isActive('chat') ? 'active' : ''}  // Thêm class cho CSS
          onClick={() => onNavClick('chat')}
          sx={{ color: isActive('chat') ? '#fff !important' : '#aaa !important' }}  // Thêm !important để force color
        >
          <ChatIcon sx={{ color: 'inherit' }} /> 
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileHeader;