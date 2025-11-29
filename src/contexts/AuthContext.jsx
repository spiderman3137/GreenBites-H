import { createContext, useContext, useState, useEffect } from 'react';

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
    // Check for existing session
    const savedUser = localStorage.getItem('greenbites_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('greenbites_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('greenbites_user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('greenbites_users') || '[]');
        
        // Check if email already exists
        if (users.some(u => u.email === userData.email)) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem('greenbites_users', JSON.stringify(users));

        const { password, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('greenbites_user', JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('greenbites_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
