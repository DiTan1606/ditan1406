// src/components/MobileFooter.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const MobileFooter = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const username = currentUser?.displayName || 'User';

  const navItems = [
    { icon: <HomeIcon />, path: '/home' },
    { icon: <SearchIcon />, path: '/search' },
    { icon: <SettingsIcon />, path: '/settings' },
    {
      icon: <Avatar sx={{ width: 24, height: 24 }}>{username[0]}</Avatar>,
      path: `/profile/${currentUser?.uid}`,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box className="mobile-footer">
      {navItems.map((item) => (
        <Box
          key={item.path}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
        </Box>
      ))}
    </Box>
  );
};

export default MobileFooter;