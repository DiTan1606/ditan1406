// src/pages/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, 'users', user.uid), {
        username, email, friends: [], createdAt: new Date().toISOString()
      });
      navigate('/login');
    } catch (err) {
      setError('Đăng ký thất bại');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-mockup">
          <img src="/mockup.png" alt="App preview"/>
        </div>

        <div className="auth-form-container">
          {/* LOGO */}
          <Typography class="auth-logo">Welcome to your new chapter</Typography>

          <div className="auth-box">
            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Tên người dùng"
                variant="filled"
                className="auth-input"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="filled"
                className="auth-input"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                variant="filled"
                className="auth-input"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
              <Button fullWidth type="submit" className="auth-button">
                Đăng ký
              </Button>
            </form>
          </div>

          <div className="auth-switch">
            <Typography variant="body2">
              Đã có tài khoản?{' '}
              <Link onClick={() => navigate('/login')} className="auth-switch-link">
                Đăng nhập
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;