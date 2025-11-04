import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Hook để lấy ID từ URL
import { doc, onSnapshot } from 'firebase/firestore'; // Dùng onSnapshot để xem real-time
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import EditProfileModal from '../components/EditProfileModal'; // Component chúng ta sắp tạo

function ProfilePage() {
  const { userId } = useParams(); // 1. Lấy userId từ URL (ví dụ: /profile/abcxyz)
  const { currentUser } = useAuth(); // 2. Lấy user đang đăng nhập (từ Context)
  
  const [profileUser, setProfileUser] = useState(null); // State cho user CỦA TRANG NÀY
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State để mở/đóng modal

  // 3. Kiểm tra xem user đang xem có phải là chủ profile không
  const isOwnProfile = currentUser && currentUser.uid === userId;

  // 4. Dùng useEffect để lắng nghe (onSnapshot) thông tin của user này
  useEffect(() => {
    setLoading(true);
    const userDocRef = doc(db, 'users', userId);

    // Dùng onSnapshot để data tự động cập nhật khi ta sửa profile
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setProfileUser(doc.data());
      } else {
        console.log("Không tìm thấy user!");
        setProfileUser(null);
      }
      setLoading(false);
    });

    // Dọn dẹp listener khi component unmount
    return () => unsubscribe();
  }, [userId]); // Chạy lại mỗi khi userId trên URL thay đổi

  if (loading) {
    return <div>Đang tải trang cá nhân...</div>;
  }

  if (!profileUser) {
    return <div>Không tìm thấy người dùng này.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <p><Link to="/">Về Trang chủ</Link></p>
      <img 
        src={profileUser.photoURL} 
        alt="Avatar" 
        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <h1>{profileUser.displayName}</h1>
      <p>Email: {profileUser.email}</p>
      <p style={{ fontStyle: 'italic', background: '#f4f4f4', padding: '10px' }}>
        Bio: {profileUser.bio}
      </p>

      {/* 5. Chỉ hiển thị nút này nếu đây là profile CỦA MÌNH */}
      {isOwnProfile && (
        <button onClick={() => setShowModal(true)} style={{ padding: '10px' }}>
          Chỉnh sửa Trang cá nhân
        </button>
      )}

      {/* 6. Render Modal (nó sẽ bị ẩn ban đầu) */}
      {/* Chúng ta truyền currentUser VÀO modal để nó có thông tin ban đầu */}
      {isOwnProfile && (
        <EditProfileModal 
          showModal={showModal} 
          onClose={() => setShowModal(false)}
          currentUserData={profileUser} 
        />
      )}
    </div>
  );
}

export default ProfilePage;

