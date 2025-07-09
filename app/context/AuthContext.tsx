// context/AuthContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromToken } from '../utils/auth';

type User = {
  id: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
} | null;

const AuthContext = createContext<{ user: User }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const userData = getUserFromToken();
    if (userData && (userData.role === "CLIENT" || userData.role === "ADMIN")) {
      setUser({
        ...userData,
        role: userData.role as "CLIENT" | "ADMIN",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
