import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define user interface
interface User {
  id: string;
  username: string;
  role: 'admin' | 'user' | 'guest';
}

// Authentication context type
interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {}
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          withCredentials: true // Important for session-based auth
        });
        setUser(response.data as User);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Login method
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials, {
        withCredentials: true
      });
      setUser(response.data as User);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};