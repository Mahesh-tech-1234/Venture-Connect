import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import * as api from '../services/apiService';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('venture_connect_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      sessionStorage.removeItem('venture_connect_user');
    }
    setIsLoading(false);
  }, []);


  const login = (userData: User) => {
    const userToStore = { ...userData };
    delete userToStore.password; // Never store password in session
    setUser(userToStore);
    sessionStorage.setItem('venture_connect_user', JSON.stringify(userToStore));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('venture_connect_user');
    // In a real app with JWT tokens, you would also call an API to invalidate the token.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};