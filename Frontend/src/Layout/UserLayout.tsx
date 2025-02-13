// src/layouts/UserLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../features/User/components/Navbar";
import Footer from "../features/User/components/Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;