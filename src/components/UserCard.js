// src/components/UserCard.js (cập nhật onViewProfile để dùng handleNavClick với userId, stopPropagation cho nút để không trigger profile khi bấm nút)
import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useNav } from '../hooks/useNav';

const UserCard = ({ user, onViewProfile }) => {
  const { currentUser } = useContext(AuthContext);
  const { handleNavClick, isMobile } = useNav();  // Lấy handleNavClick

  const request = user.friendRequests?.find(req => req.fromUid === currentUser?.uid && req.status === 'pending');

  const handleAddFriend = async (e) => {
    e.stopPropagation();  // Ngăn click trigger onViewProfile
    if (currentUser) {
      const theirRef = doc(db, 'users', user.uid);
      await updateDoc(theirRef, { 
        friendRequests: arrayUnion({ fromUid: currentUser.uid, status: 'pending' })
      });
    }
  };

  const handleCancelRequest = async (e) => {
    e.stopPropagation();
    if (currentUser) {
      const theirRef = doc(db, 'users', user.uid);
      await updateDoc(theirRef, { 
        friendRequests: arrayRemove({ fromUid: currentUser.uid, status: 'pending' })
      });
    }
  };

  const handleAccept = async (e) => {
    e.stopPropagation();
    if (currentUser) {
      const myRef = doc(db, 'users', currentUser.uid);
      const theirRef = doc(db, 'users', user.uid);
      await updateDoc(myRef, { 
        friends: arrayUnion(user.uid),
        friendRequests: arrayRemove({ fromUid: user.uid, status: 'pending' })
      });
      await updateDoc(theirRef, { 
        friends: arrayUnion(currentUser.uid)
      });
    }
  };

  const handleReject = async (e) => {
    e.stopPropagation();
    if (currentUser) {
      const myRef = doc(db, 'users', currentUser.uid);
      await updateDoc(myRef, { 
        friendRequests: arrayRemove({ fromUid: user.uid, status: 'pending' })
      });
    }
  };

  const isFriend = currentUser && user.friends?.includes(currentUser.uid);
  const isIncomingRequest = currentUser?.friendRequests?.find(req => req.fromUid === user.uid && req.status === 'pending');  // Check trên currentUser

  const handleCardClick = () => {
    // Thay vì navigate trực tiếp, dùng handleNavClick với panel 'profile' và userId
    handleNavClick('profile', { userId: user.uid });
  };

  return (
    <Box 
      sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 1, cursor: 'pointer' }}
      onClick={handleCardClick}  // Trigger profile view
      role="button"
      aria-label={`View profile of ${user.username}`}
    >
      <Avatar alt={`${user.username}'s avatar`} src={user.photoURL || '/default_avt.png'} sx={{ mr: 2 }} />
      <Box flex={1}>
        <Typography variant="subtitle1">{user.username}</Typography>
        <Typography variant="body2" color="text.secondary">{user.bio || 'No bio'}</Typography>
      </Box>
      {isFriend ? (
        <Typography color="success.main">Bạn bè</Typography>
      ) : request ? (
        <Button variant="outlined" onClick={handleCancelRequest} sx={{ mr: 1 }}>Hủy kết bạn</Button>
      ) : isIncomingRequest ? (
        <>
          <Button variant="contained" onClick={handleAccept}>Đồng ý</Button>
          <Button variant="outlined" onClick={handleReject} sx={{ ml: 1 }}>Từ chối</Button>
        </>
      ) : (
        <Button variant="outlined" onClick={handleAddFriend}>Thêm bạn bè</Button>
      )}
    </Box>
  );
};

export default React.memo(UserCard);