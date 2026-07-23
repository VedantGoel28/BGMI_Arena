import { createContext, useContext, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = window.localStorage.getItem('bgmi_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (nextUser: User): void => {
    setUser(nextUser);
    window.localStorage.setItem('bgmi_user', JSON.stringify(nextUser));
  };

  const logout = (): void => {
    setUser(null);
    window.localStorage.removeItem('bgmi_user');
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
