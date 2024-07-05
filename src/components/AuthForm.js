import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { login, register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleAuthSuccess } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInput || !passwordInput) {
      setErrorMessage('Both fields are required');
      return;
    }
    try {
      const response = isLogin 
        ? await login(loginInput, passwordInput)
        : await register(loginInput, passwordInput);
      
      handleAuthSuccess(response.data.token, loginInput);
      setErrorMessage('');
    } catch (error) {
      console.error('Error during authentication', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">{isLogin ? 'Login' : 'Register'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
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
      {errorMessage && <Alert severity="error" style={{ marginTop: '16px' }}>{errorMessage}</Alert>}
    </Container>
  );
};

export default AuthForm;
