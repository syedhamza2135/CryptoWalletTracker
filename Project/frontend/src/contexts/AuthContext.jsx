import { createContext, useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getMe()
        .then(({ data }) => {
          console.log('getMe response:', data);
          setUser(data.data.user);
        })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    console.log('login response:', data);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (userData) => {
    const { data } = await authApi.register(userData);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  const isAdmin = () => user && user.role === 'admin';

  // Show loading spinner while initializing
  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};