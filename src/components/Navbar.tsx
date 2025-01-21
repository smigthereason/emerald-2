import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-black shadow-md z-50 w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Center - Logo */}
          <div className="flex-1 flex justify-start w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-auto w-40"
                src="src/assets/Logos/e-logo1"
                alt="E Logo"
              />
            </Link>
          </div>

          {/* Right side - Home, About, Donate, and Contact */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-4xl">
            <Link to="/" className="text-black hover:text-[#ff6633]">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-[#ff6633]">
              About
            </Link>
           
            <Link to="/contact" className="text-white hover:text-[#ff6633]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;