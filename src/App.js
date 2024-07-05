import React from 'react';
import AuthForm from './components/AuthForm';
import AuthenticatedApp from './components/AuthenticatedApp';
import { AuthProvider, useAuth } from './context/AuthContext';

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