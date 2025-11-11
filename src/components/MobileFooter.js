// src/components/MobileFooter.js  (updated dùng navConfig và useNav)
import React, { useContext } from 'react';
import { Box, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import { AuthContext } from '../contexts/AuthContext';
import { useNav } from '../hooks/useNav';

const iconMap = {
  HomeIcon: HomeIcon,
  SearchIcon: SearchIcon,
  AddIcon: AddIcon,
  SettingsIcon: SettingsIcon,
};

const MobileFooter = ({ onNavClick }) => {
  const { currentUser } = useContext(AuthContext);
  const { isActive, navItems } = useNav();

  // Lọc chỉ items cho footer (bạn có thể config riêng nếu cần)
  const footerItems = navItems.filter(item => ['home', 'search', 'create', 'settings', 'profile'].includes(item.panel));

  return (
    <Box className="mobile-footer">
      {footerItems.map((item) => (
        <Box
          key={item.panel}
          className={`nav-item ${isActive(item.panel) ? 'active' : ''}`}
          onClick={() => onNavClick(item.panel)}
          sx={{ cursor: 'pointer' }}
        >
          {item.panel === 'profile' ? (
            <Box
              sx={{
                border: isActive(item.panel) ? '2px solid #0095f6' : 'none',
                borderRadius: '50%',
                p: '2px'
              }}
            >
              <Avatar src={currentUser?.photoURL || '/default_avt.png'} sx={{ width: 28, height: 28 }} />
            </Box>
          ) : (
            (() => {
              const Icon = iconMap[item.icon];
              return <Icon sx={{ fontSize: '1.6rem', color: isActive(item.panel) ? '#fff !important' : '#aaa !important' }} />;
            })()
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MobileFooter;