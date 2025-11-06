// src/components/MobileFooter.js  (updated dùng navConfig và useNav)
import React, { useContext } from 'react';
import { Box, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from '../contexts/AuthContext';
import { useNav } from '../hooks/useNav';

const iconMap = {
  HomeIcon: <HomeIcon />,
  SearchIcon: <SearchIcon />,
  AddCircleOutlineIcon: <AddCircleOutlineIcon />,
  SettingsIcon: <SettingsIcon />,
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
            React.cloneElement(iconMap[item.icon], {
              sx: { fontSize: '1.6rem', color: isActive(item.panel) ? '#fff' : '#aaa' }
            })
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MobileFooter;