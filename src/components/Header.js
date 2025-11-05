// src/components/Header.js
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import {
  Box, Avatar, Tooltip, Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // THÊM

const Header = ({ onNavClick, activePanel }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const username = currentUser?.displayName || 'User';

  const isActive = (panel) => {
    if (panel === 'home') return location.pathname === '/home' && activePanel === 'suggestions';
    if (panel === 'chat') return location.pathname === '/chat';
    return activePanel === panel;
  };

  return (
    <Box className="right-sidebar">
      <Box className="nav-upper">
        {/* LOGO */}
        <Typography
          className={`logo ${isActive('home') ? 'active' : ''}`}
          onClick={() => onNavClick('home')}
          sx={{ cursor: 'pointer', mb: 3, fontSize: '1.8rem' }}
        >
          {username}
        </Typography>

        {/* CÁC NÚT */}
        {[
          { icon: <HomeIcon />, panel: 'home', label: 'Home' },
          { icon: <SearchIcon />, panel: 'search', label: 'Tìm kiếm' },
          { icon: <ChatIcon />, panel: 'chat', label: 'Tin nhắn' },
          { icon: <NotificationsIcon />, panel: 'notifications', label: 'Thông báo' },
          {
            icon: (
              <Avatar src={currentUser?.photoURL || '/default_avt.png'} sx={{ width: 28, height: 28 }}>
              </Avatar>
            ),
            panel: 'profile',
            label: 'Hồ sơ',
          },
          // NÚT CREATE MỚI
          { icon: <AddCircleOutlineIcon />, panel: 'create', label: 'Tạo bài' },
        ].map((item) => (
          <Tooltip key={item.panel} title={item.label} placement="left">
            <Box
              className={`nav-item ${isActive(item.panel) ? 'active' : ''}`}
              onClick={() => onNavClick(item.panel)}
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </Box>
          </Tooltip>
        ))}
      </Box>

      <Box className="nav-lower">
        <Tooltip title="Cài đặt" placement="left">
          <Box
            className={`nav-item ${isActive('settings') ? 'active' : ''}`}
            onClick={() => onNavClick('settings')}
          >
            <SettingsIcon />
            <span className="nav-label">Setting</span>
          </Box>
        </Tooltip>

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

export default Header;