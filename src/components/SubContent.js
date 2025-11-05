// src/components/SubContent.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const SubContent = ({ activePanel }) => {
  const renderPanel = () => {
    switch (activePanel) {
      case 'suggestions':
        return <Suggestions />;
      case 'search':
        return <SearchPanel />;
      case 'chat-list':
        return <ChatList />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'profile':
        return <ProfileInfo />;
      case 'settings':
        return <SettingsPanel />;
      case 'create':
        return <CreatePostPanel />;
      default:
        return <Suggestions />;
    }
  };

  return (
    <Box className="sub-content">
      {renderPanel()}
    </Box>
  );
};

// CÁC PANEL
const Suggestions = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Gợi ý kết bạn</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có gợi ý</Typography>
    </Box>
  </Box>
);

const SearchPanel = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Tìm kiếm</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Nhập username để tìm</Typography>
    </Box>
  </Box>
);

const ChatList = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Tin nhắn</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có tin nhắn</Typography>
    </Box>
  </Box>
);

const NotificationsPanel = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Thông báo</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có thông báo</Typography>
    </Box>
  </Box>
);

const ProfileInfo = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Thông tin cá nhân</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Chưa có thông tin</Typography>
    </Box>
  </Box>
);

const SettingsPanel = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Cài đặt</Typography>
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">Cài đặt tài khoản</Typography>
    </Box>
  </Box>
);

const CreatePostPanel = () => (
  <Box>
    <Typography fontWeight="bold" mb={2} color="#fff">Tạo bài viết mới</Typography>
    <Box sx={{ p: 3, backgroundColor: '#1a1a1a', borderRadius: 2, textAlign: 'center' }}>
      <Typography fontSize="0.9rem" color="#aaa">
        Form đăng bài sẽ được thêm ở đây
      </Typography>
    </Box>
  </Box>
);

export default SubContent;