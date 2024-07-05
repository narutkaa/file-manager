import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { login, register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleAuthSuccess } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInput || !passwordInput) {
      setErrorMessage("Both fields are required");
      return;
    }
    try {
      const response = isLogin
        ? await login(loginInput, passwordInput)
        : await register(loginInput, passwordInput);

      handleAuthSuccess(response.data.token, loginInput);
      setErrorMessage("");
    } catch (error) {
      console.error("Error during authentication", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box
        height={400}
        width={450}
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey" }}
      >
        <Typography variant="h4" sx={{ alignSelf: 'center' }}>{isLogin ? "Login" : "Register"}</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            type={showPassword ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button type="button" onClick={() => setIsLogin(!isLogin)} fullWidth style={{ marginTop: '16px' }}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </Button>
        </form>
        {errorMessage && (
          <Alert severity="error" style={{ marginTop: "16px" }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
