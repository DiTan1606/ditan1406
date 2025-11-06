// src/components/DesktopSidebar.js  (rename từ Header.js, dùng useNav và navConfig)
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { Box, Avatar, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNav } from '../hooks/useNav';

const iconMap = {
  HomeIcon: <HomeIcon />,
  SearchIcon: <SearchIcon />,
  ChatIcon: <ChatIcon />,
  NotificationsIcon: <NotificationsIcon />,
  AddCircleOutlineIcon: <AddCircleOutlineIcon />,
  SettingsIcon: <SettingsIcon />,
};

const DesktopSidebar = ({ onNavClick, activePanel }) => {
  const { currentUser } = useContext(AuthContext);
  const { isActive, navItems } = useNav();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const username = currentUser?.displayName || 'User';

  return (
    <Box className="desktop-sidebar">
      <Box className="nav-upper">
        <Typography
          className={`logo ${isActive('home') ? 'active' : ''}`}
          onClick={() => onNavClick('home')}
          sx={{ cursor: 'pointer', mb: 3, fontSize: '1.8rem' }}
        >
          {username}
        </Typography>

        {navItems.map((item) => (
          <Tooltip key={item.panel} title={item.label} placement="left">
            <Box
              className={`nav-item ${isActive(item.panel) ? 'active' : ''}`}
              onClick={() => onNavClick(item.panel)}
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              {item.icon === 'Avatar' ? (
                <Avatar src={currentUser?.photoURL || '/default_avt.png'} sx={{ width: 28, height: 28 }} />
              ) : (
                iconMap[item.icon]
              )}
              <span className="nav-label">{item.label}</span>
            </Box>
          </Tooltip>
        ))}
      </Box>

      <Box className="nav-lower">
        <Tooltip title="Đăng xuất" placement="left">
          <Box className="nav-item" onClick={handleLogout} sx={{ color: '#ed4956' }}>
            <SettingsIcon sx={{ transform: 'rotate(90deg)' }} />
            <span className="nav-label">Logout</span>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DesktopSidebar;