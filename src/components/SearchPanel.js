// src/components/SearchPanel.js (tương tự update onViewProfile)
import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import UserCard from './UserCard';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import { useNav } from '../hooks/useNav';

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const { isMobile, setViewingProfileId, handleNavClick } = useNav();
  const { filteredUsers, loading } = useFilteredUsers({ searchTerm, excludeFriends: false });

  if (loading) return <Typography>Loading...</Typography>;

  const results = searched ? filteredUsers : [];

  const handleViewProfile = (userId) => {
    if (isMobile) {
      handleNavClick('profile', { userId });
    } else {
      setViewingProfileId(userId);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Tìm kiếm</Typography>
      <TextField
        label="Nhập username rồi Enter"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') setSearched(true); }}
        fullWidth
        margin="normal"
      />
      {searched && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Kết quả</Typography>
          {results.length > 0 ? (
            results.map((user) => <UserCard key={user.uid} user={user} onViewProfile={() => handleViewProfile(user.uid)} />)
          ) : (
            <Typography>No users found</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchPanel;