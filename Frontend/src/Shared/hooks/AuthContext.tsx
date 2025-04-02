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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      console.log("Login attempt with:", { email });
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      console.log("Login response:", response.data);

      const { access_token, user: userData } = response.data;
      localStorage.setItem("token", access_token);

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

      if (userData.is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      console.error("Error details:", error.response?.data);
      throw new Error(error.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      
      // After successful registration, explicitly login
      try {
        await login(email, password);
      } catch (loginError) {
        console.error("Auto-login after registration failed:", loginError);
        // Navigate to login page if auto-login fails
        navigate("/login");
        throw new Error("Registration successful, but login failed. Please try logging in.");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      throw new Error(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://127.0.0.1:5000/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
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
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, signup }}
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