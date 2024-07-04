import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const AuthForm = ({ onAuthSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Переключатель между формами входа и регистрации

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'auth/login' : 'auth/register';
    try {
      const response = await axios.post(`http://212.113.102.189:7000/${endpoint}`, {
        login,
        password,
      });
      console.log(response.data);
      onAuthSuccess(response.data.token);
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">{isLogin ? 'Login' : 'Register'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'} Password
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </Button>
      </form>
    </Container>
  );
};

export default AuthForm;
