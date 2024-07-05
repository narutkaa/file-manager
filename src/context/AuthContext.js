import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    if (storedToken && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
      setToken(storedToken);
    }
  }, []);

  const handleAuthSuccess = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    setIsAuthenticated(true);
    setUserName(userName);
    setToken(token);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, token, handleAuthSuccess, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
