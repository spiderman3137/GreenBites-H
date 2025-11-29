import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and verify it
    const initAuth = async () => {
      const token = localStorage.getItem('greenbites_token');
      
      if (token) {
        try {
          const data = await api.verifyToken();
          setUser(data.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('greenbites_token');
          localStorage.removeItem('greenbites_user');
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      
      // Store token and user
      localStorage.setItem('greenbites_token', data.token);
      localStorage.setItem('greenbites_user', JSON.stringify(data.user));
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      
      // Store token and user
      localStorage.setItem('greenbites_token', data.token);
      localStorage.setItem('greenbites_user', JSON.stringify(data.user));
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('greenbites_token');
    localStorage.removeItem('greenbites_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
