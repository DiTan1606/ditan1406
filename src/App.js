// src/App.js
import React, { useContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import MobileFooter from './components/MobileFooter';
import SubContent from './components/SubContent';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

// src/App.js (thêm các trang)
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import SettingsPage from './pages/SettingsPage.js';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" replace />;
};

// MAIN LAYOUT – QUẢN LÝ SUB-CONTENT
const MainLayout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)'); // bạn dùng 900px

  const [activePanel, setActivePanel] = useState('suggestions');

  const handleNavClick = (panel) => {
    if (isMobile) {
      // MOBILE: CHUYỂN TRANG THẬT
      if (panel === 'home') navigate('/home');
      else if (panel === 'search') navigate('/mobile/search');
      else if (panel === 'chat') navigate('/chat');
      else if (panel === 'notifications') navigate('/mobile/notifications');
      else if (panel === 'profile') navigate('/mobile/profile');
      else if (panel === 'create') navigate('/mobile/create');
      else if (panel === 'settings') navigate('/mobile/settings');
    } else {
      // DESKTOP: CHỈ ĐỔI SUB-CONTENT
      if (panel === 'home') {
        navigate('/home');
        setActivePanel('suggestions');
      } else if (panel === 'search') {
        navigate('/home');
        setActivePanel('search');
      } else if (panel === 'chat') {
        navigate('/chat');
        setActivePanel('chat-list');
      } else if (panel === 'notifications') {
        navigate('/home');
        setActivePanel('notifications');
      } else if (panel === 'profile') {
        navigate('/home');
        setActivePanel('profile');
      } else if (panel === 'create') {
        navigate('/home');
        setActivePanel('create');
      } else if (panel === 'settings') {
        navigate('/home');
        setActivePanel('settings');
      }
    }
  };

  return (
    <div className="app-layout">
      {currentUser && <Header onNavClick={handleNavClick} activePanel={activePanel} isMobile={isMobile} />}
      {currentUser && <MobileHeader onNavClick={handleNavClick} />}
      {currentUser && <MobileFooter onNavClick={handleNavClick} />}

      <main className="main-content">{children}</main>

      {/* ẨN SUB-CONTENT TRÊN MOBILE */}
      {currentUser && !isMobile && <SubContent activePanel={activePanel} />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* TRANG CHÍNH */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route path="/mobile/search" element={<PrivateRoute><MainLayout><SearchPage /></MainLayout></PrivateRoute>} />
        <Route path="/mobile/notifications" element={<PrivateRoute><MainLayout><NotificationsPage /></MainLayout></PrivateRoute>} />
        <Route path="/mobile/profile" element={<PrivateRoute><MainLayout><ProfilePage /></MainLayout></PrivateRoute>} />
        <Route path="/mobile/create" element={<PrivateRoute><MainLayout><CreatePostPage /></MainLayout></PrivateRoute>} />
        <Route path="/mobile/settings" element={<PrivateRoute><MainLayout><SettingsPage /></MainLayout></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;