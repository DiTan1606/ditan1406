import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import cả 'db' (Firestore)
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Import onSnapshot

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. onAuthStateChanged theo dõi TÀI KHOẢN (Auth)
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 2. NẾU user đăng nhập (có object 'user' từ Auth)...
        // ...chúng ta sẽ LẮNG NGHE HỒ SƠ (Firestore) của họ
        
        // Tạo một listener (onSnapshot) để theo dõi real-time
        // document trong collection 'users' có ID là uid của user
        const userDocRef = doc(db, 'users', user.uid);
        
        const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            // 3. Nếu tìm thấy hồ sơ, đặt currentUser là data TỪ FIRESTORE
            // (doc.data() sẽ chứa displayName, bio, photoURL, v.v.)
            setCurrentUser(doc.data());
          } else {
            // 4. Trường hợp hiếm: User đã tạo Auth, nhưng vì lý do gì đó
            // hồ sơ Firestore chưa được tạo.
            // Chúng ta fallback về object 'user' của Auth
            console.warn("Không tìm thấy hồ sơ user trong Firestore, fallback về Auth user.");
            setCurrentUser(user);
          }
          setLoading(false);
        });

        // Trả về hàm dọn dẹp cho listener HỒ SƠ
        // (Khi user đăng xuất, nó sẽ ngừng lắng nghe hồ sơ này)
        return () => unsubscribeProfile();

      } else {
        // 5. User đã đăng xuất
        setCurrentUser(null);
        setLoading(false);
      }
    });

    // Trả về hàm dọn dẹp cho listener TÀI KHOẢN
    // (Khi component unmount, nó sẽ ngừng lắng nghe Auth)
    return () => unsubscribeAuth();
    
  }, []); // useEffect này chỉ chạy 1 lần khi app khởi động

  const value = {
    currentUser,
    // (Bạn có thể thêm các hàm khác như signup, login, logout ở đây nếu muốn)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
