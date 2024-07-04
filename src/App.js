// src/App.js
import React, { useState } from 'react';
import AuthForm from './components/AuthForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <h1>Hello!</h1>
      )}
    </div>
  );
};

export default App;
