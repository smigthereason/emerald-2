// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   role: 'admin' | 'user' | 'guest';
//   image?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   userRole: 'admin' | 'user' | 'guest' | null;
//   login: (credentials: { email: string; password: string }) => Promise<void>;
//   logout: () => Promise<void>;
//   updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
//   userRole: null,
//   login: async () => {},
//   logout: async () => {},
//   updateUser: () => {}
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest' | null>(null);

//   // Initialize auth state from localStorage if available
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setIsAuthenticated(true);
//       setUserRole(userData.role);
//     } else {
//       checkAuth();
//     }
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/auth/me', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const userData = (response.data as { user: User }).user;
//       setUser(userData);
//       setIsAuthenticated(true);
//       setUserRole(userData.role);
//       localStorage.setItem('user', JSON.stringify(userData));
//     } catch {
//       setUser(null);
//       setIsAuthenticated(false);
//       setUserRole(null);
//       localStorage.removeItem('user');
//     }
//   };

//   const login = async ({ email, password, navigate }: { email: string; password: string; navigate: (path: string) => void }) => {
//     try {
//       const response = await axios.post<{ access_token: string; user: User }>('http://127.0.0.1:5000/auth/login', {
//         email,
//         password
//       });
//       const { access_token, user: userData } = response.data;

//       localStorage.setItem('token', access_token);
//       localStorage.setItem('user', JSON.stringify(userData));

//       setUser(userData);
//       setIsAuthenticated(true);
//       setUserRole(userData.role);

//       // Navigate based on user role
//       if (userData.role === 'admin') {
//         navigate('/admin-dashboard');
//       } else {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://127.0.0.1:5000/auth/logout', {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setUser(null);
//       setIsAuthenticated(false);
//       setUserRole(null);
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   const updateUser = (userData: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...userData };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated,
//       userRole,
//       login,
//       logout,
//       updateUser
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user" | "guest";
  image?: string;
  is_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: "admin" | "user" | "guest" | null;
  login: (credentials: {
    email: string;
    password: string;
    navigate: (path: string) => void;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userRole: null,
  login: async () => {},
  logout: async () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "user" | "guest" | null>(
    null
  );

  // Initialize auth state from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      setUserRole(userData.is_admin ? "admin" : "user");
    } else {
      checkAuth();
    }
  }, []);

  // Update the checkAuth function to use the correct endpoint
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/current_user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = response.data;
      const updatedUser = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.is_admin ? "admin" : "user",
        is_admin: userData.is_admin,
        image: userData.image || "",
      };
      setUser(updatedUser);
      setIsAuthenticated(true);
      setUserRole(userData.is_admin ? "admin" : "user");
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const login = async ({
    email,
    password,
    navigate,
  }: {
    email: string;
    password: string;
    navigate: (path: string) => void;
  }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password_hash: password,
      });
      const { access_token, is_admin } = response.data;

      localStorage.setItem("token", access_token);

      // Fetch user data after successful login
      const userResponse = await axios.get(
        "http://127.0.0.1:5000/current_user",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userData = userResponse.data;
      const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: is_admin ? "admin" : "user",
        is_admin,
        image: userData.image,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      setUserRole(is_admin ? "admin" : "user");

      // Navigate based on user role
      if (is_admin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userRole,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
