import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className=" w-screen text-black text-2xl overflow-x-hidden p-4">
      <div className="px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between items-start">
          {/* Logo and tagline */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0 flex justify-center md:justify-start">
            <img
              className="h-auto w-48"
              src="/src/assets/Logos/e-logo1.png"
              alt="Kind Logo"
            />
          </div>

          {/* About */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0">
            <h3 className="font-bold mb-2 text-center md:text-left">About</h3>
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li>
                <Link to="/" className="no-underline hover:text-[#ff6633]">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/" className="no-underline hover:text-[#ff6633]">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/" className="no-underline hover:text-[#ff6633]">
                  Beneficiary Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0">
            <h3 className="font-bold mb-2 text-center md:text-left">
              Get Involved
            </h3>
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li>
                <Link to="/loading" className="no-underline hover:text-[#ff6633]">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/partner" className="no-underline hover:text-[#ff6633]">
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="no-underline hover:text-[#ff6633]"
                >
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0">
            <h3 className="font-bold mb-2 text-center md:text-left">Support</h3>
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li>
                <Link
                  to="/contact#contact"
                  className="no-underline hover:text-[#ff6633]"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/policies#policy"
                  className="no-underline hover:text-[#ff6633]"
                >
                  Policies
                </Link>
              </li>
              <li>
                <Link to="/FAQ#faq" className="no-underline hover:text-[#ff6633]">
                  F.A.Q
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Network */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6 md:mb-0">
            <h3 className="font-bold mb-2 text-center md:text-left">
              Social Network
            </h3>
            <ul className="text-xl space-y-1 text-center md:text-left">
              <li>
                <Link
                  to="https://facebook.com"
                  className="no-underline hover:text-[#ff6633]"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="https://instagram.com"
                  className="no-underline hover:text-[#ff6633]"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="https://tiktok.com"
                  className="no-underline hover:text-[#ff6633]"
                >
                  TikTok
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex justify-center">
          <div className="w-full text-center text-sm text-gray-400">
            Copyright © All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
