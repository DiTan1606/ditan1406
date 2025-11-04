import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- 1. Thêm Link
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; 

function HomePage() {
  const navigate = useNavigate();
  // currentUser bây giờ là object từ Firestore (nhờ AuthContext đã nâng cấp)
  const { currentUser } = useAuth(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Đăng xuất thành công!");
      navigate('/login'); 
    } catch (err) {
      console.error("Lỗi Đăng xuất:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Chủ (Đã đăng nhập)</h1>
      
      {currentUser ? (
        <div>
          <p>Chào mừng, <strong>{currentUser.displayName}</strong>!</p>
          <p>UID của bạn: {currentUser.uid}</p>
          
          {/* 2. Thêm Link để đi đến trang cá nhân của bạn */}
          {/* Nó sẽ tạo ra URL ví dụ: /profile/abc-123-xyz */}
          <Link to={`/profile/${currentUser.uid}`}>
            Đi đến Trang cá nhân
          </Link>
        </div>
      ) : (
        <p>Đang tải thông tin user...</p>
      )}

      <br />
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', marginTop: '20px' }}
      >
        Đăng Xuất
      </button>
    </div>
  );
}

export default HomePage;

