// src/layouts/MainLayout.js (updated: tách InnerLayout để useNav ở trong Provider)
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileHeader from '../components/MobileHeader';
import MobileFooter from '../components/MobileFooter';
import SubContent from '../components/SubContent';
import { useNav } from '../hooks/useNav';
import { NavProvider } from '../contexts/NavContext';

const MainLayout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  return (
    <NavProvider>
      <InnerLayout>{children}</InnerLayout>
    </NavProvider>
  );
};

const InnerLayout = ({ children }) => {
  const { activePanel, handleNavClick, isMobile } = useNav();

  return (
    <div className="app-layout">
      {!isMobile && <DesktopSidebar onNavClick={handleNavClick} activePanel={activePanel} />}
      {isMobile && <MobileHeader onNavClick={handleNavClick} />}
      <main className="main-content">{children}</main>
      {!isMobile && <SubContent activePanel={activePanel} />}
      {isMobile && <MobileFooter onNavClick={handleNavClick} />}
    </div>
  );
};

export default MainLayout;