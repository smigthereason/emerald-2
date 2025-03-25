import React, { useState } from "react";
import googleIcon from "/assets/icons/google.png";
import Logo from "/assets/Logos/logoxxxx.png";
import { Link, useNavigate } from "react-router-dom";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface FormData {
  signIn: SignInData;
  signUp: SignUpData;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    signIn: { email: "", password: "" },
    signUp: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");

  // State to toggle password visibility for both forms
  const [showPassword, setShowPassword] = useState<{
    signIn: boolean;
    signUp: boolean;
  }>({
    signIn: false,
    signUp: false,
  });

  const handleInputChange = (
    form: keyof FormData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [form]: { ...prev[form], [field]: value },
    }));
    setError("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(formData.signIn),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", data.token);

        // Optional: Store user info
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard or home page
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Connection error. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.signUp.username,
          email: formData.signUp.email,
          password: formData.signUp.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Existing success logic
      } else {
        // Handle error
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Connection error. Please try again.");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://127.0.0.1:5000/login/google";
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Link to="/">
          <img
            className="logo hidden sm:block h-auto w-80 cursor-pointer"
            src={Logo}
            alt="E Logo"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center max-h-screen absolute inset-0 ">
        <div
          className={`relative overflow-hidden w-[1280px] max-w-full min-h-[480px] 
          bg-white rounded-2xl shadow-2xl 
          transition-all duration-1000 ease-in-out
          ${isRightPanelActive ? "right-panel-active" : ""}`}
        >
          {/* Sign Up Container */}
          <div
            className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-1
            ${
              isRightPanelActive
                ? "translate-x-full opacity-100 z-5 animate-show"
                : "opacity-0 z-1"
            }`}
          >
            <form
              onSubmit={handleSignUp}
              className=" bg-white flex flex-col items-center justify-center h-full text-center px-12"
            >
              <h1 className="font-bold text-2xl mb-2">Create Account</h1>
              <div className="social-container flex my-5">
                <button
                  onClick={handleGoogleAuth}
                  type="button"
                  className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
                >
                  <img src={googleIcon} alt="google" className="w-10 h-10" />
                </button>
              </div>
              <span className="text-xs">
                or use your email for registration
              </span>
              {error && (
                <span className="text-red-500 text-sm mt-2">{error}</span>
              )}
              
              
              <input
                type="text"
                placeholder="Username"
                className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
                value={formData.signUp.username}
                onChange={(e) =>
                  handleInputChange("signUp", "username", e.target.value)
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
                value={formData.signUp.email}
                onChange={(e) =>
                  handleInputChange("signUp", "email", e.target.value)
                }
                required
              />
              {/* Password Input with Toggle */}
              <div className="relative w-full">
                <input
                  type={showPassword.signUp ? "text" : "password"}
                  placeholder="Password"
                  className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
                  value={formData.signUp.password}
                  onChange={(e) =>
                    handleInputChange("signUp", "password", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      signUp: !prev.signUp,
                    }))
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword.signUp ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#d66161] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Container */}
          <div
            className={`absolute top-0 h-full w-1/2 z-2 transition-all duration-1000 ease-in-out
            ${isRightPanelActive ? "-translate-x-full" : ""}`}
          >
            <form
              onSubmit={handleSignIn}
              className="bg-white flex flex-col items-center justify-center h-full text-center px-12"
            >
              <h1 className="font-bold text-2xl mb-2">Sign in</h1>
              <div className="social-container flex my-5">
                <button
                  onClick={handleGoogleAuth}
                  type="button"
                  className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
                >
                  <img src={googleIcon} alt="google" className="w-10 h-10" />
                </button>
              </div>
              <span className="text-xs">or use your account</span>
              {error && (
                <span className="text-red-500 text-sm mt-2">{error}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
                value={formData.signIn.email}
                onChange={(e) =>
                  handleInputChange("signIn", "email", e.target.value)
                }
                required
              />
              {/* Password Input with Toggle */}
              <div className="relative w-full">
                <input
                  type={showPassword.signIn ? "text" : "password"}
                  placeholder="Password"
                  className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
                  value={formData.signIn.password}
                  onChange={(e) =>
                    handleInputChange("signIn", "password", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      signIn: !prev.signIn,
                    }))
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword.signIn ? "Hide" : "Show"}
                </button>
              </div>
              <a href="#" className="text-xs my-4">
                Forgot your password?
              </a>
              <button
                type="submit"
                className="bg-[#d66161] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay Container */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden 
            transition-transform duration-1000 ease-in-out z-100
            ${isRightPanelActive ? "-translate-x-full" : ""}`}
          >
            <div
              className={`bg-gradient-to-t from-[#d88598ab] to-[#e47a93] 
              text-white relative left-[-100%] h-full w-[200%]
              transition-transform duration-1000 ease-in-out
              ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}
            >
              {/* Left Overlay Panel */}
              <div
                className={`absolute flex flex-col items-center justify-center 
                text-center w-1/2 h-full px-10
                transition-transform duration-1000 ease-in-out
                ${isRightPanelActive ? "translate-x-0" : "-translate-x-1/5"}`}
              >
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-sm leading-5 tracking-wider mb-5">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => {
                    setIsRightPanelActive(false);
                    setError("");
                  }}
                  className="ghost bg-transparent border border-white 
                  text-white rounded-full 
                  text-xs font-bold uppercase px-12 py-3 
                  tracking-wider
                  transition-transform duration-200 
                  hover:bg-white hover:text-[#d66161]"
                  type="button"
                >
                  Sign In
                </button>
              </div>

              {/* Right Overlay Panel */}
              <div
                className={`absolute right-0 flex flex-col items-center justify-center 
                text-center w-1/2 h-full px-10
                transition-transform duration-1000 ease-in-out
                ${isRightPanelActive ? "translate-x-1/5" : "translate-x-0"}`}
              >
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-sm leading-5 tracking-wider mb-5">
                  Enter your personal details and start journey with us
                </p>
                <button
                  onClick={() => {
                    setIsRightPanelActive(true);
                    setError("");
                  }}
                  className="ghost bg-transparent border border-white 
                  text-white rounded-full 
                  text-xs font-bold uppercase px-12 py-3 
                  tracking-wider
                  transition-transform duration-200 
                  hover:bg-white hover:text-[#d66161]"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
