//src/hooks/useFilteredUsers.js (mới: reuse filter logic)
import { useState, useMemo } from 'react';
import { useUsers } from './useUsers';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useFilteredUsers = ({ searchTerm = '', excludeFriends = false }) => {
  const { users, loading } = useUsers();
  const { currentUser } = useContext(AuthContext);

  const filteredUsers = useMemo(() => {
    let result = users;
    if (excludeFriends) {
      result = result.filter(u => !currentUser?.friends?.includes(u.uid));
    }
    if (searchTerm) {
      result = result.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return result;
  }, [users, searchTerm, excludeFriends, currentUser]);

  return { filteredUsers, loading };
};