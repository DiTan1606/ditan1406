// src/components/MobileFooter.js
import React from 'react';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const MobileFooter = ({ onNavClick }) => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const username = currentUser?.displayName || 'User';

  const navItems = [
    { icon: <HomeIcon />, panel: 'home', path: '/home' },
    { icon: <SearchIcon />, panel: 'search', path: '/mobile/search' },
    { icon: <AddCircleOutlineIcon />, panel: 'create', path: '/mobile/create' },
    { icon: <SettingsIcon />, panel: 'settings', path: '/mobile/settings' },
    {
      icon: (
        <Avatar
          src={currentUser?.photoURL || '/default_avt.png'}
          sx={{ width: 28, height: 28 }}
        >
        </Avatar>
      ),
      panel: 'profile',
      path: '/mobile/profile'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box className="mobile-footer">
      {navItems.map((item) => (
        <Tooltip key={item.panel}>
          <Box
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => onNavClick(item.panel)}
            sx={{ cursor: 'pointer' }}
          >
            {item.panel === 'profile' ? (
              <Box
                sx={{
                  border: isActive(item.path) ? '2px solid #0095f6' : 'none',
                  borderRadius: '50%',
                  p: '2px'
                }}
              >
                {item.icon}
              </Box>
            ) : (
              React.cloneElement(item.icon, {
                sx: { fontSize: '1.6rem', color: isActive(item.path) ? '#fff' : '#aaa' }
              })
            )}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default MobileFooter;