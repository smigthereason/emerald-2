import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center space-y-4">
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
        <div className="flex space-x-4 text-xl font-light">
          <Link to="/" className="hover:text-gray-500 ">New Arrivals</Link>
          <Link to="/about" className="hover:text-gray-500">Offers</Link>
          <Link to="/contact" className="hover:text-gray-500">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;