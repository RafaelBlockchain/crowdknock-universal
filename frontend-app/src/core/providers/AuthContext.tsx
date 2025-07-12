// frontend-app/src/core/providers/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get('/auth/me');
          setUser(res.data);
        } catch {
          setUser(null);
        }
      }
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token } = res.data;
      await AsyncStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userRes = await axios.get('/auth/me');
      setUser(userRes.data);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
