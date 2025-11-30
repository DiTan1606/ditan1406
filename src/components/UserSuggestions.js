// src/components/UserSuggestions.js (update handleViewProfile để setViewingProfileId mà không change activePanel)
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import UserCard from './UserCard';
import { useNav } from '../hooks/useNav';

const UserSuggestions = () => {
  const { filteredUsers: suggestions, loading } = useFilteredUsers({ excludeFriends: true });
  const { isMobile, setViewingProfileId, handleNavClick } = useNav();

  if (loading) return <Typography>Loading suggestions...</Typography>;

  const handleViewProfile = (userId) => {
    if (isMobile) {
      handleNavClick('profile', { userId });
    } else {
      setViewingProfileId(userId);  // Desktop: Chỉ set viewing, giữ activePanel = suggestions
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Gợi ý kết bạn</Typography>
      {suggestions.length > 0 ? (
        suggestions.map((user) => <UserCard key={user.uid} user={user} onViewProfile={() => handleViewProfile(user.uid)} />)
      ) : (
        <Typography>No suggestions</Typography>
      )}
    </Box>
  );
};

export default UserSuggestions;