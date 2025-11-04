// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import MobileFooter from './components/MobileFooter';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" replace />;
};

const MainLayout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {/* Desktop Sidebar */}
      {currentUser && <Header />}

      {/* Mobile: Header + Footer */}
      {currentUser && <MobileHeader />}
      {currentUser && <MobileFooter />}

      {/* Nội dung chính (giữa) */}
      <main className="main-content">{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<PrivateRoute><MainLayout><Home /></MainLayout></PrivateRoute>} />
        <Route path="/profile/:userId" element={<PrivateRoute><MainLayout><Profile /></MainLayout></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><MainLayout><Chat /></MainLayout></PrivateRoute>} />

        <Route path="/search" element={<PrivateRoute><MainLayout><div>Search</div></MainLayout></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><MainLayout><div>Notifications</div></MainLayout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><MainLayout><div>Settings</div></MainLayout></PrivateRoute>} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;