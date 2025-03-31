// import React, { useState } from "react";
// import googleIcon from "/assets/icons/google.png";
// import Logo from "/assets/Logos/logoxxxx.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserContext } from "../../hooks/userContext";

// interface SignInData {
//   email: string;
//   password: string;
// }

// interface SignUpData {
//   username: string;
//   name: string;
//   email: string;
//   password: string;
// }

// interface FormData {
//   signIn: SignInData;
//   signUp: SignUpData;
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useUserContext();
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     signIn: { email: "", password: "" },
//     signUp: {
//       username: "",
//       name: "",
//       email: "",
//       password: "",
//     },
//   });
//   const [error, setError] = useState("");

//   // State to toggle password visibility for both forms
//   const [showPassword, setShowPassword] = useState<{
//     signIn: boolean;
//     signUp: boolean;
//   }>({
//     signIn: false,
//     signUp: false,
//   });

//   const handleInputChange = (
//     form: keyof FormData,
//     field: string,
//     value: string
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [form]: { ...prev[form], [field]: value },
//     }));
//     setError("");
//   };

 
//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(formData.signIn.email, formData.signIn.password, navigate);
//       console.log("Login successful. Token:", localStorage.getItem("token"));
//       // The navigation should be handled within the login function or auth context
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       setError("Login failed. Please check your credentials.");
//     }
//   };
  


  
//   const handleSignUp = (e: React.FormEvent) => {
//     e.preventDefault();
//     signup(formData.signUp.username, formData.signUp.email, formData.signUp.password, navigate);
//     console.log("Signup successful. Token:", localStorage.getItem("token"));
//     navigate("/login");
//   };
  
//   const handleGoogleAuth = () => {
//     window.location.href = "http://127.0.0.1:5000/login/google";
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center">
//         <Link to="/">
//           <img
//             className="logo hidden sm:block h-auto w-80 cursor-pointer"
//             src={Logo}
//             alt="E Logo"
//           />
//         </Link>
//       </div>

//       <div className="flex items-center justify-center max-h-screen absolute inset-0 ">
//         <div
//           className={`relative overflow-hidden w-[1280px] max-w-full min-h-[480px] 
//           bg-white rounded-2xl shadow-2xl 
//           transition-all duration-1000 ease-in-out
//           ${isRightPanelActive ? "right-panel-active" : ""}`}
//         >
//           {/* Sign Up Container */}
//           <div
//             className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-1
//             ${
//               isRightPanelActive
//                 ? "translate-x-full opacity-100 z-5 animate-show"
//                 : "opacity-0 z-1"
//             }`}
//           >
//             <form
//               onSubmit={handleSignUp}
//               className=" bg-white flex flex-col items-center justify-center h-full text-center px-12"
//             >
//               <h1 className="font-bold text-2xl mb-2">Create Account</h1>
//               <div className="social-container flex my-5">
//                 <button
//                   onClick={handleGoogleAuth}
//                   type="button"
//                   className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
//                 >
//                   <img src={googleIcon} alt="google" className="w-10 h-10" />
//                 </button>
//               </div>
//               <span className="text-xs">
//                 or use your email for registration
//               </span>
//               {error && (
//                 <span className="text-red-500 text-sm mt-2">{error}</span>
//               )}
              
              
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
//                 value={formData.signUp.username}
//                 onChange={(e) =>
//                   handleInputChange("signUp", "username", e.target.value)
//                 }
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
//                 value={formData.signUp.email}
//                 onChange={(e) =>
//                   handleInputChange("signUp", "email", e.target.value)
//                 }
//                 required
//               />
//               {/* Password Input with Toggle */}
//               <div className="relative w-full">
//                 <input
//                   type={showPassword.signUp ? "text" : "password"}
//                   placeholder="Password"
//                   className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
//                   value={formData.signUp.password}
//                   onChange={(e) =>
//                     handleInputChange("signUp", "password", e.target.value)
//                   }
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword((prev) => ({
//                       ...prev,
//                       signUp: !prev.signUp,
//                     }))
//                   }
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
//                 >
//                   {showPassword.signUp ? "Hide" : "Show"}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-[#d66161] text-white rounded-full border border-[#B25671] 
//                 text-xs font-bold uppercase px-12 py-3 
//                 tracking-wider mt-4 
//                 transition-transform duration-200 
//                 hover:opacity-90 active:scale-95"
//               >
//                 Sign Up
//               </button>
//             </form>
//           </div>

//           {/* Sign In Container */}
//           <div
//             className={`absolute top-0 h-full w-1/2 z-2 transition-all duration-1000 ease-in-out
//             ${isRightPanelActive ? "-translate-x-full" : ""}`}
//           >
//             <form
//               onSubmit={handleSignIn}
//               className="bg-white flex flex-col items-center justify-center h-full text-center px-12"
//             >
//               <h1 className="font-bold text-2xl mb-2">Sign in</h1>
//               <div className="social-container flex my-5">
//                 <button
//                   onClick={handleGoogleAuth}
//                   type="button"
//                   className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
//                 >
//                   <img src={googleIcon} alt="google" className="w-10 h-10" />
//                 </button>
//               </div>
//               <span className="text-xs">or use your account</span>
//               {error && (
//                 <span className="text-red-500 text-sm mt-2">{error}</span>
//               )}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
//                 value={formData.signIn.email}
//                 onChange={(e) =>
//                   handleInputChange("signIn", "email", e.target.value)
//                 }
//                 required
//               />
//               {/* Password Input with Toggle */}
//               <div className="relative w-full">
//                 <input
//                   type={showPassword.signIn ? "text" : "password"}
//                   placeholder="Password"
//                   className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
//                   value={formData.signIn.password}
//                   onChange={(e) =>
//                     handleInputChange("signIn", "password", e.target.value)
//                   }
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword((prev) => ({
//                       ...prev,
//                       signIn: !prev.signIn,
//                     }))
//                   }
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
//                 >
//                   {showPassword.signIn ? "Hide" : "Show"}
//                 </button>
//               </div>
//               <a href="#" className="text-xs my-4">
//                 Forgot your password?
//               </a>
//               <button
//                 type="submit"
//                 className="bg-[#d66161] text-white rounded-full border border-[#B25671] 
//                 text-xs font-bold uppercase px-12 py-3 
//                 tracking-wider mt-4 
//                 transition-transform duration-200 
//                 hover:opacity-90 active:scale-95"
//               >
//                 Sign In
//               </button>
//             </form>
//           </div>

//           {/* Overlay Container */}
//           <div
//             className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden 
//             transition-transform duration-1000 ease-in-out z-100
//             ${isRightPanelActive ? "-translate-x-full" : ""}`}
//           >
//             <div
//               className={`bg-gradient-to-t from-[#d88598ab] to-[#e47a93] 
//               text-white relative left-[-100%] h-full w-[200%]
//               transition-transform duration-1000 ease-in-out
//               ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}
//             >
//               {/* Left Overlay Panel */}
//               <div
//                 className={`absolute flex flex-col items-center justify-center 
//                 text-center w-1/2 h-full px-10
//                 transition-transform duration-1000 ease-in-out
//                 ${isRightPanelActive ? "translate-x-0" : "-translate-x-1/5"}`}
//               >
//                 <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//                 <p className="text-sm leading-5 tracking-wider mb-5">
//                   To keep connected with us please login with your personal info
//                 </p>
//                 <button
//                   onClick={() => {
//                     setIsRightPanelActive(false);
//                     setError("");
//                   }}
//                   className="ghost bg-transparent border border-white 
//                   text-white rounded-full 
//                   text-xs font-bold uppercase px-12 py-3 
//                   tracking-wider
//                   transition-transform duration-200 
//                   hover:bg-white hover:text-[#d66161]"
//                   type="button"
//                 >
//                   Sign In
//                 </button>
//               </div>

//               {/* Right Overlay Panel */}
//               <div
//                 className={`absolute right-0 flex flex-col items-center justify-center 
//                 text-center w-1/2 h-full px-10
//                 transition-transform duration-1000 ease-in-out
//                 ${isRightPanelActive ? "translate-x-1/5" : "translate-x-0"}`}
//               >
//                 <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
//                 <p className="text-sm leading-5 tracking-wider mb-5">
//                   Enter your personal details and start journey with us
//                 </p>
//                 <button
//                   onClick={() => {
//                     setIsRightPanelActive(true);
//                     setError("");
//                   }}
//                   className="ghost bg-transparent border border-white 
//                   text-white rounded-full 
//                   text-xs font-bold uppercase px-12 py-3 
//                   tracking-wider
//                   transition-transform duration-200 
//                   hover:bg-white hover:text-[#d66161]"
//                   type="button"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
      await login(formData.signIn.email, formData.signIn.password);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(
        formData.signUp.username,
        formData.signUp.email,
        formData.signUp.password
      );
    } catch (err) {
      setError("Registration failed. Please try again.");
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
    <div className="min-h-screen bg-gray-50">
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
                className="w-full p-3 mb-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={formData.signUp.username}
                onChange={(e) =>
                  handleInputChange("signUp", "username", e.target.value)
                }
                required
              />
              
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                className="w-full p-3 mb-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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