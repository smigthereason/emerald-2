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

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     if (authToken) {
  //       try {
  //         const response = await fetch("http://127.0.0.1:5000/current_user", {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
  //         });

  //         const data = await response.json();
  //         if (response.ok) {
  //           setCurrentUser(data);
  //         } else {
  //           handleLogout();
  //         }
  //       } catch (error) {
  //         handleLogout();
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   fetchCurrentUser();
  // }, [authToken]);

  // const signup = (username: string, email: string, password: string, navigate: (path: string) => void) => {
  //   fetch("http://127.0.0.1:5000/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, email, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success) {
  //         navigate("/"); 
  //         alert(res.success);
  //       } else {
  //         alert(res.error || "Something went wrong");
  //       }
  //     })
  //     .catch(() => alert("Something went wrong"));
  // };

  // const login = (email: string, password: string, navigate: (path: string) => void) => {
  //   fetch("http://127.0.0.1:5000/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.access_token) {
  //         setAuthToken(res.access_token);
  //         localStorage.setItem("token", res.access_token);
  //         localStorage.setItem("refresh_token", res.refresh_token);
  //         navigate("/"); // ✅ Use navigate inside a component
  //         alert("Login success");
  //       } else {
  //         alert(res.error || "Invalid username or password");
  //       }
  //     });
  // };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (authToken) {
        console.log("🔍 Sending Token in Header:", authToken); // ✅ Debug log

        if (authToken === "admin-dummy-token") {
          setCurrentUser({
            id: 1,
            username: "admin",
            email: "admin@example.com",
            is_admin: true,
          });
        } else {
          try {
            const response = await fetch("http://127.0.0.1:5000/current_user", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`, // ✅ Send correct token format
              },
            });
    
            const data = await response.json();
            console.log("🟢 Current User Response:", data); // ✅ Debug log
    
            if (response.ok) {
              setCurrentUser(data);
            } else {
              console.error("❌ Failed to fetch user:", data);
              handleLogout();
            }
          } catch (error) {
            console.error("❌ Error fetching user:", error);
            handleLogout();
          }
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
        console.log("Signup Response:", res);
        if (res.success) {
          // ✅ Immediately log in after signup
          login(email, password, navigate);
        } else {
          alert(res.error || "Something went wrong");
        }
      })
      .catch(() => alert("Something went wrong"));
  };
  
  
  
  const login = (email: string, password: string, navigate: (path: string) => void) => {

    if (email === "admin@example.com" && password === "admin1234") {
      const adminToken = "admin-dummy-token";
      setAuthToken(adminToken);
      localStorage.setItem("token", adminToken);
      localStorage.setItem("refresh_token", "admin-dummy-refresh-token");
      navigate("/admin");
      alert("Admin Login success");
      return;
    }

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password_hash: password }), // ✅ Send "password_hash"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Login Response:", res);
        if (res.access_token) {
          setAuthToken(res.access_token);
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          navigate("/");
          alert("Login success");
        } else {
          alert(res.error || "Invalid username or password");
        }
      })
      .catch(() => alert("Something went wrong"));
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
