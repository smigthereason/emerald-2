import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import Search from "./Search";
import { useCart } from "../../../Shared/hooks/CartContext"; // Adjust the path as needed

const Navbar: React.FC = () => {
  const { cart } = useCart(); // Access cart items from the CartContext

  return (
    <nav className="relative py-4 mb-8 flex flex-col">
      {/* Searchbar */}
      <div className="relative -top-2 sm:top-0 flex items-center rounded w-64">
        <Search />
      </div>

      {/* Center: Logo and Navigation Links */}
      <div className="flex flex-col items-center justify-center">
        <div>
          <Link to="/">
            {/* Logo for larger screens */}
            <img
              className="hidden sm:block h-auto w-64"
              src="/src/assets/Logos/e5.png"
              alt="E Logo"
            />
            {/* Logo for smaller screens */}
            <img
              className="block sm:hidden h-16 w-16 relative right-24"
              src="/src/assets/Logos/black-hq.png"
              alt="E Logo Small"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex space-x-4 text-xl font-light mt-2">
          <Link
            to="/"
            className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
          >
            New Arrivals
          </Link>
          <Link
            to="/sales"
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
      <div className="absolute -right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
        {/* Login Icon */}
        <Link to="/login">
          <PiUserBold
            size={window.innerWidth < 640 ? 20 : 28}
            className="transform transition duration-300 hover:scale-95"
          />
        </Link>

        {/* Cart Icon with Notification Badge */}
        <Link to="/cart" className="relative">
          <IoCartOutline
            size={window.innerWidth < 640 ? 24 : 28}
            className="transform transition duration-300 hover:scale-95"
          />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
