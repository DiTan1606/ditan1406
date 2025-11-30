// src/hooks/useUsers.js (quay lại onSnapshot để realtime update state sau khi add/cancel/accept/reject)
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const useUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
        const userList = querySnapshot.docs
          .filter(doc => doc.id !== currentUser.uid)
          .map(doc => ({ uid: doc.id, ...doc.data() }));
        setUsers(userList);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  return { users, loading };
};