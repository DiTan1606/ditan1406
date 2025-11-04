// File: src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore"; 
import { auth, db } from '../firebase'; // Import auth và db từ file config

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ
    setLoading(true);

    if (!displayName) {
      setError('Vui lòng nhập tên hiển thị!');
      setLoading(false);
      return;
    }

    try {
      // 1. Tạo tài khoản trên Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("Tạo tài khoản Auth thành công:", user.uid);

      // 2. Tạo document hồ sơ trong collection 'users' (Firestore)
      // Chúng ta dùng user.uid làm ID cho document
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName, // Lấy từ form
        bio: "Xin chào! Tôi là người mới.", // Bio mặc định
        photoURL: `https://ui-avatars.com/api/?name=${displayName.replace(' ', '+')}&background=random`, 
        friends: [],
        friendRequests: [],
        createdAt: serverTimestamp() // Thêm dấu thời gian
      });
      
      console.log("Tạo hồ sơ Firestore thành công!");

      // 3. Xong việc, chuyển hướng về trang chủ
      setLoading(false);
      navigate('/');

    } catch (err) {
      // 4. Xử lý lỗi
      console.error("Lỗi Đăng ký:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng.');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu (cần ít nhất 6 ký tự).');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại.');
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Tên hiển thị:</label>
          <input 
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Mật khẩu:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Đang xử lý...' : 'Đăng Ký'}
        </button>
      </form>
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
      </p>
    </div>
  );
}

export default RegisterPage;