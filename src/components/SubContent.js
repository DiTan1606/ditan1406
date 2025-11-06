// src/components/SubContent.js (bỏ debug log)
import React from 'react';
import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import SearchPage from '../pages/SearchPage';
import NotificationsPage from '../pages/NotificationsPage';
import ProfilePage from '../pages/ProfilePage';
import CreatePostPage from '../pages/CreatePostPage';
import SettingsPage from '../pages/SettingsPage';
import Chat from '../pages/Chat';

const SubContent = ({ activePanel }) => {
  const renderPanel = () => {
    switch (activePanel) {
      case 'suggestions':
        return <Suspense fallback={<div>Loading...</div>}><Suggestions /></Suspense>;
      case 'search':
        return <Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>;
      case 'chat-list':
        return <Suspense fallback={<div>Loading...</div>}><ChatList /></Suspense>;
      case 'notifications':
        return <Suspense fallback={<div>Loading...</div>}><NotificationsPage /></Suspense>;
      case 'profile':
        return <Suspense fallback={<div>Loading...</div>}><ProfilePage /></Suspense>;
      case 'create':
        return <Suspense fallback={<div>Loading...</div>}><CreatePostPage /></Suspense>;
      case 'settings':
        return <Suspense fallback={<div>Loading...</div>}><SettingsPage /></Suspense>;
      default:
        return <Suspense fallback={<div>Loading...</div>}><Suggestions /></Suspense>;
    }
  };

  return <Box className="sub-content">{renderPanel()}</Box>;
};

// Placeholder giữ nguyên
const Suggestions = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Gợi ý kết bạn</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có gợi ý</Typography>
    </Box>
  </Box>
);

const ChatList = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Danh sách tin nhắn</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có tin nhắn</Typography>
    </Box>
  </Box>
);

export default SubContent;