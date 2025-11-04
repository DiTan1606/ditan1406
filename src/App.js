import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import component "gác cổng"
import ProtectedRoute from './components/ProtectedRoute';

// Import các trang của bạn (Tạm thời tạo file rỗng cho chúng)
// Bạn cần tạo các file này trong `src/pages/`
// Ví dụ: HomePage.js, LoginPage.js...
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
// import Navbar from './components/Navbar'; // Bạn có thể thêm Navbar ở đây

function App() {
  const { currentUser } = useAuth(); // Lấy currentUser để xử lý logic redirect

  return (
    <BrowserRouter>
      {/* <Navbar /> */} {/* Navbar có thể đặt ở đây để hiển thị ở mọi trang */}
      <Routes>
        {/*
          =================================
          ROUTES ĐƯỢC BẢO VỆ (Protected)
          Bắt buộc phải đăng nhập để xem
          =================================
        */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Thêm các route cần bảo vệ khác ở đây (vd: Chat, Settings...) */}

        {/*
          =================================
          ROUTES CÔNG KHAI (Public)
          Ai cũng có thể xem
          =================================
        */}
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={currentUser ? <Navigate to="/" replace /> : <RegisterPage />} 
        />
        
        {/* Route 404 (Không tìm thấy) */}
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
