import { createContext, useEffect, useState, useContext, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setAuthToken: (token: string | null) => void;
  signup: (username: string, email: string, password: string, navigate: (path: string) => void) => void;
  login: (email: string, password: string, navigate: (path: string) => void) => void;
  logout: (navigate: (path: string) => void) => void;
  authToken: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (authToken) {
        try {
          const response = await fetch("http://127.0.0.1:5000/current_user", {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
          });

          const data = await response.json();
          if (response.ok) {
            setCurrentUser(data);
          } else {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [authToken]);

  const signup = (username: string, email: string, password: string, navigate: (path: string) => void) => {
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          navigate("/"); 
          alert(res.success);
        } else {
          alert(res.error || "Something went wrong");
        }
      })
      .catch(() => alert("Something went wrong"));
  };

  const login = (email: string, password: string, navigate: (path: string) => void) => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          setAuthToken(res.access_token);
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          navigate("/"); // ✅ Use navigate inside a component
          alert("Login success");
        } else {
          alert(res.error || "Invalid username or password");
        }
      });
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };

  const logout = (navigate: (path: string) => void) => {
    fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleLogout();
          navigate("/login"); // ✅ Use navigate inside a component
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, setAuthToken, signup, login, logout, authToken, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
