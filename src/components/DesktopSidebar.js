// src/components/DesktopSidebar.js  (rename từ Header.js, dùng useNav và navConfig)
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { Box, Avatar, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ChatIcon from '@mui/icons-material/SendRounded';
import NotificationsIcon from '@mui/icons-material/FavoriteBorderRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { useNav } from '../hooks/useNav';

const iconMap = {
  HomeIcon: <HomeIcon />,
  SearchIcon: <SearchIcon />,
  ChatIcon: <ChatIcon />,
  NotificationsIcon: <NotificationsIcon />,
  AddIcon: <AddIcon />,
  SettingsIcon: <SettingsIcon />,
  Logout: <LogoutIcon />
};

const DesktopSidebar = ({ onNavClick, activePanel }) => {
  const { currentUser } = useContext(AuthContext);
  const { isActive, navItems } = useNav();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const username = currentUser?.displayName || 'User';

  // Lọc navItems để loại bỏ 'settings' ra khỏi nav-upper
  const upperNavItems = navItems.filter(item => item.panel !== 'settings');
  // Lấy item settings riêng
  const settingsItem = navItems.find(item => item.panel === 'settings');

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

        {upperNavItems.map((item) => (
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
        {/* Thêm nút Settings vào nav-lower */}
        {settingsItem && (
          <Tooltip key={settingsItem.panel} title={settingsItem.label} placement="left">
            <Box
              className={`nav-item ${isActive(settingsItem.panel) ? 'active' : ''}`}
              onClick={() => onNavClick(settingsItem.panel)}
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              {iconMap[settingsItem.icon]}
              <span className="nav-label">{settingsItem.label}</span>
            </Box>
          </Tooltip>
        )}

        <Tooltip title="Đăng xuất" placement="left">
          <Box className="nav-item" onClick={handleLogout} sx={{ color: '#ed4956' }}>
            <LogoutIcon/>
            <span className="nav-label">Logout</span>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DesktopSidebar;