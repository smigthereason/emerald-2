

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   role: "admin" | "user" | "guest";
//   image?: string;
//   is_admin?: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   userRole: "admin" | "user" | "guest" | null;
//   login: (credentials: {
//     email: string;
//     password: string;
//     navigate: (path: string) => void;
//   }) => Promise<void>;
//   logout: () => Promise<void>;
//   updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
//   userRole: null,
//   login: async () => {},
//   logout: async () => {},
//   updateUser: () => {},
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState<"admin" | "user" | "guest" | null>(
//     null
//   );

//   // Initialize auth state from localStorage if available
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setIsAuthenticated(true);
//       setUserRole(userData.is_admin ? "admin" : "user");
//     } else {
//       checkAuth();
//     }
//   }, []);

//   // Update the checkAuth function to use the correct endpoint
//   const checkAuth = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/current_user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const userData = response.data;
//       const updatedUser = {
//         id: userData.id,
//         username: userData.username,
//         email: userData.email,
//         role: userData.is_admin ? "admin" : "user",
//         is_admin: userData.is_admin,
//         image: userData.image || "",
//       };
//       setUser(updatedUser);
//       setIsAuthenticated(true);
//       setUserRole(userData.is_admin ? "admin" : "user");
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch {
//       setUser(null);
//       setIsAuthenticated(false);
//       setUserRole(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//   };

//   const login = async ({
//     email,
//     password,
//     navigate,
//   }: {
//     email: string;
//     password: string;
//     navigate: (path: string) => void;
//   }) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/login", {
//         email,
//         password_hash: password,
//       });
//       const { access_token, is_admin } = response.data;
  
//       localStorage.setItem("token", access_token);
  
//       // Fetch user data after successful login
//       const userResponse = await axios.get("http://127.0.0.1:5000/current_user", {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });
  
//       const userData = userResponse.data;
//       const user = {
//         id: userData.id,
//         username: userData.username,
//         email: userData.email,
//         role: is_admin ? "admin" : "user",
//         is_admin,
//         image: userData.image,
//       };
  
//       localStorage.setItem("user", JSON.stringify(user));
//       setUser(user);
//       setIsAuthenticated(true);
//       setUserRole(is_admin ? "admin" : "user");
  
//       // Navigate based on user role
//       if (is_admin) {
//         navigate("/admin/dashboard"); // Updated to match your admin route
//       } else {
//         navigate("/"); // Updated to match your client route
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://127.0.0.1:5000/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setUser(null);
//       setIsAuthenticated(false);
//       setUserRole(null);
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   const updateUser = (userData: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...userData };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         userRole,
//         login,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:5000/current_user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        const user = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.is_admin ? "admin" : "user",
          image: userData.image,
        };

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password_hash: password,
      });

      const { access_token, is_admin } = response.data;
      localStorage.setItem("token", access_token);

      const userResponse = await axios.get("http://127.0.0.1:5000/current_user", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const userData = userResponse.data;
      const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: is_admin ? "admin" : "user",
        image: userData.image,
      };

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password: password,
      });
      // Auto-login after signup
      await login(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/logout", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, signup }}>
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