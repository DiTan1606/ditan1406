// src/components/Header.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import {
  Box,
  Avatar,
  Tooltip,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // THÊM DÒNG NÀY

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const username = currentUser?.displayName || 'User';

  // Danh sách menu
  const navItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/home', tooltip: 'Home' },
    { icon: <SearchIcon />, label: 'Search', path: '/search', tooltip: 'Tìm kiếm' },
    { icon: <ChatIcon />, label: 'Chat', path: '/chat', tooltip: 'Tin nhắn' },
    { icon: <NotificationsIcon />, label: 'Notification', path: '/notifications', tooltip: 'Thông báo' },
    {
      icon: (
        <Avatar
          src={currentUser?.photoURL}
          alt={username}
          sx={{ width: 28, height: 28 }}
        >
          {username[0]?.toUpperCase()}
        </Avatar>
      ),
      label: 'Profile',
      path: `/profile/${currentUser?.uid}`,
      tooltip: 'Hồ sơ',
    },
  ];

  // Kiểm tra trang hiện tại
  const isActive = (path) => location.pathname === path;

  return (
    <Box className="right-sidebar">
      {/* PHẦN TRÊN */}
      <Box className="nav-upper">
        {/* LOGO = USERNAME */}
        <Typography
          className="logo"
          onClick={() => navigate('/home')} // ĐI ĐẾN /home
        >
          {username}
        </Typography>

        {/* MENU */}
        {navItems.map((item) => (
          <Tooltip key={item.path} title={item.tooltip} placement="left">
            <Box
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* PHẦN DƯỚI */}
      <Box className="nav-lower">
        <Tooltip title="Cài đặt" placement="left">
          <Box
            className="nav-item"
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon />
            <span className="nav-label">Setting</span>
          </Box>
        </Tooltip>

        <Tooltip title="Đăng xuất" placement="left">
          <Box
            className="nav-item"
            onClick={handleLogout}
          >
            <LogoutIcon/>
            <span className="nav-label">Logout</span>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;