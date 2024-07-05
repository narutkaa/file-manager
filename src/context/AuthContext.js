import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    if (token && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleAuthSuccess = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    setIsAuthenticated(true);
    setUserName(userName);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, handleAuthSuccess, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
