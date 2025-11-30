// src/hooks/useUserProfile.js (đã dùng onSnapshot rồi, giữ nguyên để realtime)
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db, storage } from '../services/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export const useUserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const updateUserProfile = async (updatedData) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, updatedData);
      if (updatedData.username) {
        await updateProfile(currentUser, { displayName: updatedData.username });
      }
    }
  };

  const uploadAvatar = async (file) => {
    if (currentUser && file) {
      const storageRef = ref(storage, `avatars/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(currentUser, { photoURL: url });
      await updateUserProfile({ photoURL: url });
      return url;
    }
  };

  return { profile, loading, updateUserProfile, uploadAvatar };
};