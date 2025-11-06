// src/contexts/AuthContext.js  (updated: thêm value cho loading để dùng global nếu cần)
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading ? children : <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Loading...</div>}
    </AuthContext.Provider>
  );
};