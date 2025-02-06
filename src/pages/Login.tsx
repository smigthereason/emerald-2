import React, { useState } from "react";
import googleIcon from "../assets/icons/google.png";

const Login: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative -top-20">
      <div
        className={`
          relative overflow-hidden w-[1280px] max-w-full min-h-[480px] 
          bg-white rounded-2xl shadow-2xl 
          transition-all duration-1000 ease-in-out
          ${isRightPanelActive ? "right-panel-active" : ""}
        `}
      >
        {/* Sign Up Container */}
        <div
          className={`
            absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-1
            ${
              isRightPanelActive
                ? "translate-x-full opacity-100 z-5 animate-show"
                : "opacity-0 z-1"
            }
          `}
        >
          <form className="bg-white flex flex-col items-center justify-center h-full text-center px-12">
            <h1 className="font-bold text-2xl mb-2">Create Account</h1>
            <div className="social-container flex my-5">
              <a
                href="#"
                className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
              >
                <img src={googleIcon} alt="google" className="w-10 h-10" />
              </a>
            </div>
            <span className="text-xs">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <button
              className="
               bg-[#D8798F] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95
              "
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`
            absolute top-0 h-full w-1/2 z-2 transition-all duration-1000 ease-in-out
            ${isRightPanelActive ? "-translate-x-full" : ""}
          `}
        >
          <form className="bg-white flex flex-col items-center justify-center h-full text-center px-12">
            <h1 className="font-bold text-2xl mb-2">Sign in</h1>
            <div className="social-container flex my-5">
              <a
                href="#"
                className="social border border-gray-300 rounded-full h-16 w-16 flex items-center justify-center mx-2"
              >
                <img src={googleIcon} alt="google" className="w-10 h-10" />
              </a>
            </div>
            <span className="text-xs">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <a href="#" className="text-xs my-4">
              Forgot your password?
            </a>
            <button
              className="
                bg-[#D8798F] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95
              "
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div
          className={`
            absolute top-0 left-1/2 w-1/2 h-full overflow-hidden 
            transition-transform duration-1000 ease-in-out z-100
            ${isRightPanelActive ? "-translate-x-full" : ""}
          `}
        >
          <div
            className={`
              bg-gradient-to-t from-[#d88598ab] to-[#e47a93] 
              text-white relative left-[-100%] h-full w-[200%]
              transition-transform duration-1000 ease-in-out
              ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}
            `}
          >
            {/* Left Overlay Panel */}
            <div
              className={`
                absolute flex flex-col items-center justify-center 
                text-center w-1/2 h-full px-10
                transition-transform duration-1000 ease-in-out
                ${isRightPanelActive ? "translate-x-0" : "-translate-x-1/5"}
              `}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wider mb-5">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={handleSignInClick}
                className="
                  ghost bg-transparent border border-white 
                  text-white rounded-full 
                  text-xs font-bold uppercase px-12 py-3 
                  tracking-wider
                  transition-transform duration-200 
                  hover:bg-white hover:text-[#D8798F]
                "
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`
                absolute right-0 flex flex-col items-center justify-center 
                text-center w-1/2 h-full px-10
                transition-transform duration-1000 ease-in-out
                ${isRightPanelActive ? "translate-x-1/5" : "translate-x-0"}
              `}
            >
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm leading-5 tracking-wider mb-5">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={handleSignUpClick}
                className="
                  ghost bg-transparent border border-white 
                  text-white rounded-full 
                  text-xs font-bold uppercase px-12 py-3 
                  tracking-wider
                  transition-transform duration-200 
                  hover:bg-white hover:text-[#D8798F]
                "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
