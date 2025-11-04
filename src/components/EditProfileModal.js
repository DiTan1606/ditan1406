import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase'; // Import cả Storage
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// CSS cho Modal (để đơn giản, tôi dùng inline style)
const modalStyles = {
  position: 'fixed', top: '0', left: '0', 
  width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};
const modalContentStyles = {
  backgroundColor: 'white', padding: '20px', 
  borderRadius: '8px', width: '90%', maxWidth: '500px'
};

function EditProfileModal({ showModal, onClose, currentUserData }) {
  const { currentUser } = useAuth(); // Lấy user ID từ context
  
  // State cho các trường trong form, lấy giá trị ban đầu từ prop
  const [newDisplayName, setNewDisplayName] = useState(currentUserData.displayName);
  const [newBio, setNewBio] = useState(currentUserData.bio || '');
  
  // State cho việc upload ảnh
  const [newImageFile, setNewImageFile] = useState(null); // File ảnh mới
  const [imagePreview, setImagePreview] = useState(currentUserData.photoURL); // Link ảnh xem trước
  const [isUploading, setIsUploading] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cập nhật state nếu prop currentUserData thay đổi
  useEffect(() => {
    setNewDisplayName(currentUserData.displayName);
    setNewBio(currentUserData.bio || '');
    setImagePreview(currentUserData.photoURL);
  }, [currentUserData]);


  if (!showModal) return null; // Ẩn modal nếu showModal=false

  // Xử lý khi chọn file ảnh mới
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file); // Lưu file để upload
      setImagePreview(URL.createObjectURL(file)); // Tạo link xem trước tạm thời
    }
  };

  // Xử lý khi nhấn nút "Lưu thay đổi" (lưu tất cả)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true); // Bật loading

    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      let updatedPhotoURL = currentUserData.photoURL; // Giữ link ảnh cũ

      // 1. NẾU có file ảnh mới, upload nó TRƯỚC
      if (newImageFile) {
        console.log("Đang upload ảnh mới...");
        // Tạo đường dẫn trên Storage (vd: profile_images/abcxyz)
        // Tên file trùng với uid -> tự động ghi đè ảnh cũ
        const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
        
        // Tải file lên
        await uploadBytes(storageRef, newImageFile);
        
        // Lấy URL của file vừa tải
        updatedPhotoURL = await getDownloadURL(storageRef);
        console.log("Upload ảnh thành công:", updatedPhotoURL);
      }

      // 2. Cập nhật Firestore
      // (cập nhật text và link ảnh mới (nếu có))
      console.log("Đang cập nhật Firestore...");
      await updateDoc(userDocRef, {
        displayName: newDisplayName,
        bio: newBio,
        photoURL: updatedPhotoURL // Dùng link ảnh mới (hoặc cũ nếu không đổi)
      });
      
      setSuccess('Cập nhật thông tin thành công!');
      setIsUploading(false);
      setNewImageFile(null); // Xóa file đã chọn
      onClose(); // Đóng modal

    } catch (err) {
      console.error("Lỗi cập nhật profile:", err);
      setError('Cập nhật thất bại. Vui lòng thử lại.');
      setIsUploading(false);
    }
  };


  return (
    <div style={modalStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <h2>Chỉnh sửa Trang cá nhân</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Phần upload ảnh */}
          <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <br />
            <label>
              Chọn ảnh đại diện mới:
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ marginTop: '10px' }}
              />
            </label>
          </div>

          <hr />

          {/* Phần sửa text */}
          <div style={{ marginBottom: '10px' }}>
            <label>Tên hiển thị:</label>
            <input 
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Bio (tiểu sử):</label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            />
          </div>
          
          <button type="submit" style={{ padding: '10px', background: 'green', color: 'white' }} disabled={isUploading}>
            {isUploading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
          <button type="button" onClick={onClose} style={{ padding: '10px', marginLeft: '10px' }} disabled={isUploading}>
            Hủy
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
      </div>
    </div>
  );
}

export default EditProfileModal;

