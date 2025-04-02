import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import googleIcon from "/assets/icons/google.png";
import Logo from "/assets/Logos/logoxxxx.png";

const Login: React.FC = () => {
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    signIn: { email: "", password: "" },
    signUp: { username: "", email: "", password: "" },
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState({
    signIn: false,
    signUp: false,
  });

  const handleInputChange = (
    form: "signIn" | "signUp",
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
      setError("");
      await login(formData.signIn.email, formData.signIn.password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      await signup(
        formData.signUp.username,
        formData.signUp.email,
        formData.signUp.password
      );
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://127.0.0.1:5000/login/google";
  };

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
    setError("");
  };

  return (
    <div className="min-h-screen">
      {/* Logo */}
      <div className="flex items-center justify-center pt-8">
        <img
          className="h-auto w-80 cursor-pointer"
          src={Logo}
          alt="Company Logo"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center p-4">
        <div
          className={`relative w-full max-w-4xl min-h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
        >
          {/* Sign Up Form */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out ${
              isRightPanelActive
                ? "translate-x-full opacity-100 z-10"
                : "opacity-0 z-0"
            }`}
          >
            <form
              onSubmit={handleSignUp}
              className="h-full flex flex-col items-center justify-center px-12 py-8 bg-white"
            >
              <h1 className="text-2xl font-bold mb-6">Create Account</h1>
              
              <div className="flex my-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="border border-gray-300 rounded-full h-12 w-12 flex items-center justify-center mx-2 hover:bg-gray-50 transition-colors"
                >
                  <img src={googleIcon} alt="Google" className="w-6 h-6" />
                </button>
              </div>
              
              <span className="text-xs text-gray-500 mb-6">
                or use your email for registration
              </span>
              
              {error && (
                <div className="w-full mb-4 p-2 text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 mb-4 border border-gray-200 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.signUp.username}
                onChange={(e) =>
                  handleInputChange("signUp", "username", e.target.value)
                }
                required
              />
              
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border bg-gray-300 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.signUp.email}
                onChange={(e) =>
                  handleInputChange("signUp", "email", e.target.value)
                }
                required
              />
              
              <div className="relative w-full mb-6">
                <input
                  type={showPassword.signUp ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-200 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                  className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword.signUp ? "Hide" : "Show"}
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 bg-pink-500 text-white rounded-full font-semibold text-sm uppercase tracking-wider transition-colors ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-pink-600"
                }`}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out ${
              isRightPanelActive ? "translate-x-full" : ""
            }`}
          >
            <form
              onSubmit={handleSignIn}
              className="h-full flex flex-col items-center justify-center px-12 py-8 bg-white"
            >
              <h1 className="text-2xl font-bold mb-6">Sign In</h1>
              
              <div className="flex my-4">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="border border-gray-300 rounded-full h-12 w-12 flex items-center justify-center mx-2 hover:bg-gray-50 transition-colors"
                >
                  <img src={googleIcon} alt="Google" className="w-6 h-6" />
                </button>
              </div>
              
              <span className="text-xs text-gray-500 mb-6">
                or use your account
              </span>
              
              {error && (
                <div className="w-full mb-4 p-2 text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border border-gray-200 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.signIn.email}
                onChange={(e) =>
                  handleInputChange("signIn", "email", e.target.value)
                }
                required
              />
              
              <div className="relative w-full mb-6">
                <input
                  type={showPassword.signIn ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-200 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                  className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword.signIn ? "Hide" : "Show"}
                </button>
              </div>
              
              <button
                type="button"
                className="text-xs text-gray-500 mb-6 hover:text-gray-700"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 bg-pink-500 text-white rounded-full font-semibold text-sm uppercase tracking-wider transition-colors ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-pink-600"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Overlay Panel */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 ease-in-out ${
              isRightPanelActive ? "-translate-x-full" : ""
            }`}
          >
            <div
              className={`relative left-[-100%] w-[200%] h-full bg-gradient-to-br from-pink-400 to-pink-600 text-white transition-all duration-500 ease-in-out ${
                isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
              }`}
            >
              {/* Left Overlay */}
              <div
                className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-500 ease-in-out ${
                  isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"
                }`}
              >
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-sm mb-8 text-center">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={togglePanel}
                  className="py-3 px-8 border border-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-pink-500 transition-colors"
                >
                  Sign In
                </button>
              </div>

              {/* Right Overlay */}
              <div
                className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-500 ease-in-out ${
                  isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"
                }`}
              >
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-sm mb-8 text-center">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  onClick={togglePanel}
                  className="py-3 px-8 border border-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-pink-500 transition-colors"
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