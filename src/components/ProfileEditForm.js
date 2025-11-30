// src/components/ProfileEditForm.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ProfileEditForm = ({ username, bio, onSave, onCancel }) => {
  const [newUsername, setNewUsername] = useState(username || '');
  const [newBio, setNewBio] = useState(bio || '');

  const handleSave = () => {
    onSave({ username: newUsername, bio: newBio });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        label="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bio"
        value={newBio}
        onChange={(e) => setNewBio(e.target.value)}
        fullWidth
        multiline
        rows={2}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSave} sx={{ mt: 1 }}>Save</Button>
      <Button onClick={onCancel} sx={{ mt: 1, ml: 1 }}>Cancel</Button>
    </Box>
  );
};

export default ProfileEditForm;