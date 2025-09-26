import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ABHAUser } from '../types/api';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: ABHAUser | null;
  token: string | null;
  login: (abhaId: string, phone: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ABHAUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadUserProfile();
    }
  }, [token]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await authAPI.getProfile();
      setUser(profile);
      setError(null);
    } catch (err) {
      console.error('Failed to load user profile:', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (abhaId: string, phone: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authAPI.login({ abha_id: abhaId, phone });
      
      if (response.access_token && response.abha_user) {
        localStorage.setItem('access_token', response.access_token);
        setToken(response.access_token);
        setUser(response.abha_user);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};