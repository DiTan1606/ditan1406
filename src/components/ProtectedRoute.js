import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Đảm bảo đường dẫn này đúng

/**
 * Đây là component "gác cổng".
 * Nó kiểm tra xem user đã đăng nhập hay chưa.
 * Nếu đã đăng nhập (có currentUser), nó sẽ hiển thị trang con (children).
 * Nếu chưa, nó sẽ tự động chuyển hướng user về trang /login.
 */
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }

  // User đã đăng nhập, cho phép hiển thị trang
  return children;
}

export default ProtectedRoute;
