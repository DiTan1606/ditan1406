// src/App.js  (clean up lớn: tách MainLayout ra, dùng lazy loading, bỏ /mobile routes)
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';  // Mới

// Lazy load pages để dễ scale
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Chat = React.lazy(() => import('./pages/Chat'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const CreatePostPage = React.lazy(() => import('./pages/CreatePostPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Tất cả protected routes dùng cùng MainLayout, responsive inside */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<PrivateRoute><MainLayout><SearchPage /></MainLayout></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><MainLayout><NotificationsPage /></MainLayout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MainLayout><ProfilePage /></MainLayout></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><MainLayout><CreatePostPage /></MainLayout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><MainLayout><SettingsPage /></MainLayout></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;