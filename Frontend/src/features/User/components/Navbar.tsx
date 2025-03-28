// import React from "react";
// import { Link } from "react-router-dom";
// import { IoCartOutline } from "react-icons/io5";
// import { PiUserBold } from "react-icons/pi";
// import Search from "../../../Shared/pages/Searches/Search";
// import { useCart } from "../../../Shared/hooks/CartContext";
// import ThemeToggle from "../../../Shared/hooks/ThemeToggle";
// import Logo from "/assets/Logos/logoxxxx.png"

// const Navbar: React.FC = () => {
//   const { cart } = useCart(); // Access cart items from the CartContext

//   return (
//     <nav className="relative py-4 mb-8 flex flex-col">
//       {/* Searchbar */}
//       <div className="relative -top-2 sm:top-0 flex items-center rounded w-64">
//         <Search />
//       </div>

//       {/* Center: Logo and Navigation Links */}
//       <div className="flex flex-col items-center justify-center">
//         <div>
//           <Link to="/">
//             {/* Logo for larger screens */}
//             <img
//               className="logo hidden sm:block h-auto w-48"
//               src={Logo}
//               alt="E Logo"
//             />
//             {/* Logo for smaller screens */}
//             <img
//               className="logo block sm:hidden h-16 w-16 relative right-36"
//               src="/assets/Logos/black-hq.png"
//               alt="E Logo Small"
//             />
//           </Link>
//         </div>

//         {/* Navigation Links */}
//         <div className="hidden sm:flex space-x-4 text-xl font-light mt-2">
//           <Link
//             to="/"
//             className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
//           >
//             New Arrivals
//           </Link>
//           <Link
//             to="/sales"
//             className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
//           >
//             Offers
//           </Link>
//           <Link
//             to="/contact"
//             className="hover:text-[#617583] transform transition duration-300 hover:scale-95"
//           >
//             Contact
//           </Link>
//         </div>
//       </div>

//       {/* Right Side: Login and Cart Icons */}
//       <div className="absolute -right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">

//       <ThemeToggle />

//         {/* Login Icon */}
//         <Link to="/login">
//           <PiUserBold
//             size={window.innerWidth < 640 ? 20 : 28}
//             className="transform transition duration-300 hover:scale-95"
//           />
//         </Link>

//         {/* Cart Icon with Notification Badge */}
//         <Link to="/cart" className="relative">
//           <IoCartOutline
//             size={window.innerWidth < 640 ? 24 : 28}
//             className="transform transition duration-300 hover:scale-95"
//           />
//           {cart.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//               {cart.length}
//             </span>
//           )}
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import Search from "../../../Shared/pages/Searches/Search";
import { useCart } from "../../../Shared/hooks/CartContext";
import { useAuth } from "../../../Shared/hooks/AuthContext";
import ThemeToggle from "../../../Shared/hooks/ThemeToggle";
import Logo from "/assets/Logos/logoxxxx.png";

const Navbar: React.FC = () => {
  const { cart } = useCart(); // Access cart items from the CartContext
  const { isAuthenticated, user } = useAuth(); // Access auth state

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
              className="logo hidden sm:block h-auto w-48"
              src={Logo}
              alt="E Logo"
            />
            {/* Logo for smaller screens */}
            <img
              className="logo block sm:hidden h-16 w-16 relative right-36"
              src="/assets/Logos/black-hq.png"
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

      {/* Right Side: Theme Toggle, User and Cart Icons */}
      <div className="absolute -right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
        <ThemeToggle />

        {/* User Icon - Conditionally routes to profile or login */}
        <Link to={isAuthenticated ? "/profile" : "/login"} className="relative">
          {isAuthenticated && user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <PiUserBold
              size={window.innerWidth < 640 ? 20 : 28}
              className="transform transition duration-300 hover:scale-95"
            />
          )}
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
