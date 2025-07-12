import React, { createContext, useContext, useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { AuthUser } from '@/domain/models/AuthUser';
import { setAuthToken } from '@/infrastructure/api/config';
import axiosInstance from '@/infrastructure/api/axiosInstance';

interface AuthContextProps {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loadSession: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const isAuthenticated = token !== null && user !== null;

  const loadSession = async () => {
    const storedToken = (await Preferences.get({ key: 'jwt_token' })).value;
    if (storedToken) {
      setToken(storedToken);
      setAuthToken(storedToken);
      await fetchProfile();
    }
  };

  const login = async (newToken: string) => {
    setToken(newToken);
    await Preferences.set({ key: 'jwt_token', value: newToken });
    setAuthToken(newToken);
    await fetchProfile();
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await Preferences.remove({ key: 'jwt_token' });
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      const userData = AuthUser.fromJson(response.data);
      setUser(userData);
    } catch (err) {
      await logout();
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loadSession,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
