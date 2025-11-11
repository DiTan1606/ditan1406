// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (currentUser) navigate('/home');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError('Email hoặc mật khẩu sai');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* ẢNH MOCKUP */}
        <div className="auth-mockup">
          <img src="/mockup.png" alt="App preview"/>
        </div>

        {/* FORM */}
        <div className="auth-form-container">
          <Typography class="auth-logo">It's great to see you!</Typography>

          <div className="auth-box">
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
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
              {error && <Typography color="error" variant="body2">{error}</Typography>}
              <Button fullWidth type="submit" className="auth-button">
                Đăng nhập
              </Button>
              <Typography variant="body2">
                <Link href="#" sx={{ color: '#0095f6' }}>Quên mật khẩu?</Link>
              </Typography>
            </form>
          </div>

          <div className="auth-switch">
            <Typography variant="body2">
              Chưa có tài khoản?{' '}
              <Link onClick={() => navigate('/signup')} className="auth-switch-link">
                Đăng ký
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;