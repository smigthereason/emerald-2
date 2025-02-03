import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import Search from "./Search"

const Navbar: React.FC = () => {
  return (
    <nav className="relative py-4 mb-8">
      {/* Searchbar and search button */}
      <div className="relative flex items-center  rounded w-64  ">
    
        <Search />
      </div>

      {/* Center: Existing Logo and Navigation Links */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo - Now placed above links */}
        <div>
          <Link to="/">
            <img
              className="h-auto w-64"
              src="/src/assets/Logos/e5.png"
              alt="E Logo"
            />
          </Link>
        </div>

        {/* Navigation Links - Now below logo */}
        <div className="flex space-x-4 text-xl font-light mt-2">
          <Link
            to="/"
            className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
          >
            New Arrivals
          </Link>
          <Link
            to="/about"
            className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
          >
            Offers
          </Link>
          <Link
            to="/contact"
            className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Right Side: Login and Cart Icons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
        {/* Login Icon */}
        <button aria-label="Login">
          <PiUserBold
            size={28}
            className="transform transition duration-300 hover:scale-95"
          />
        </button>
        {/* Cart Icon */}
        <button aria-label="View cart">
          <IoCartOutline
            size={32}
            className="transform transition duration-300 hover:scale-95"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
