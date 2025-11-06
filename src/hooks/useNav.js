// src/hooks/useNav.js (updated: dùng NavContext cho state, bỏ debug log)
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { navItems } from '../config/navConfig';
import { useNavContext } from '../contexts/NavContext';

export const useNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const { activePanel, setActivePanel } = useNavContext();

  const handleNavClick = (panel) => {
    const item = navItems.find(i => i.panel === panel);
    if (!item) return;

    if (isMobile) {
      // Mobile: Luôn chuyển full page
      navigate(item.path);
    } else {
      // Desktop: Giữ /home trừ chat
      if (item.panel === 'chat') {
        navigate('/chat');
        setActivePanel(item.subPanel || 'chat-list');
      } else {
        navigate('/home');
        setActivePanel(item.subPanel || 'suggestions');
      }
    }
  };

  const isActive = (panel) => {
    const item = navItems.find(i => i.panel === panel);
    if (!item) return false;

    if (location.pathname === '/chat' && panel === 'chat') return true;

    // Active dựa trên activePanel khớp subPanel
    if (location.pathname === '/home' && activePanel === item.subPanel) return true;

    return false;
  };

  return { activePanel, handleNavClick, isActive, isMobile, navItems };
};