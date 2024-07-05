import React from 'react';
import AuthForm from './components/AuthForm';
import { Button, Container } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthenticatedApp = () => {
  const { userName, signOut } = useAuth();

  return (
    <Container>
      <h1>Hello, {userName}</h1>
      <Button variant="contained" color="primary" onClick={signOut}>
        Sign Out
      </Button>
    </Container>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {!isAuthenticated ? <AuthForm /> : <AuthenticatedApp />}
    </div>
  );
};

const AppContainer = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppContainer;
