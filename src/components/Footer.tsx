import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer: React.FC = () => {
  return (
    <footer className="w-screen text-black font-light text-2xl overflow-x-hidden p-4">
      <div className="px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
          {/* Logo */}
          <div className="w-full md:w-1/6 flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              className="h-auto w-48"
              src="/src/assets/Logos/e-logo1.png"
              alt="Emerald Logo"
            />
          </div>

          {/* Shop by Category */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li className="transform transition duration-300 hover:scale-95">
                <Link
                  to="/new-arrivals"
                  className="no-underline hover:text-[#617583]"
                >
                  New Arrivals
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <Link to="/sale" className="no-underline hover:text-[#617583]">
                  Sale &amp; Clearance
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <Link
                  to="/about"
                  className="no-underline hover:text-[#617583]"
                >
                  About Us
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <HashLink
                  to="/favourites-page#fav"
                  className="no-underline hover:text-[#617583]"
                  onClick={() => console.log("HashLink clicked")}
                >
                  Favourites
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li className="transform transition duration-300 hover:scale-95">
                <Link
                  to="/size-guide"
                  className="no-underline hover:text-[#617583]"
                >
                  Size Guide
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <Link to="/faq" className="no-underline hover:text-[#617583]">
                  FAQs
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <Link
                  to="/store-locator"
                  className="no-underline hover:text-[#617583]"
                >
                  Store Locator
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <Link
                  to="/gift-cards"
                  className="no-underline hover:text-[#617583]"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Networks */}
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li className="transform transition duration-300 hover:scale-95">
                <a
                  href="https://instagram.com"
                  className="no-underline hover:text-[#617583]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="transform transition duration-300 hover:scale-95">
                <a
                  href="https://tiktok.com"
                  className="no-underline hover:text-[#617583]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-400">
              Copyright © All Rights Reserved
            </p>
            <p className="text-sm text-gray-400 transform transition duration-300 hover:scale-110">
              <Link
                to="/privacy-policy"
                className="no-underline hover:text-[#352f2d]"
              >
                Privacy Policy
              </Link>
            </p>
            <p className="text-sm text-gray-400 transform transition duration-300 hover:scale-110">
              <Link
                to="/terms-of-service"
                className="no-underline hover:text-[#352f2d]"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;