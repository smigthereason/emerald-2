

import React, { useState } from "react";
import { Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Search,
  Mail,
  Bell,
  ShoppingCart,
  BarChart2,
  MessageSquare,
  DollarSign,
  Tag,
  Settings,
  Menu,
  LogOut,
  X,
} from "lucide-react";

interface SidebarLink {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = true;
  const isAdmin = true;
  const navigate = useNavigate();
  const unreadNotifications = 4;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const sidebarLinks: SidebarLink[] = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Statistics",
      path: "/admin/statistics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      title: "Reviews",
      path: "/admin/reviews",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Transactions",
      path: "/admin/transactions",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      title: "Logout",
      path: "/logout",
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const Sidebar = ({ className = "max-h-[calc(100vh-100px)]" }) => (
    <aside className={` bg-white rounded-2xl shadow-sm ${className}`}>
      <div className="p-4 flex items-center gap-2">
        <div>
          <img
            className="hidden sm:block h-auto w-60"
            src="/assets/Logos/e5.png"
            alt="E Logo"
          />
          <img
            className="block sm:hidden h-16 w-16"
            src="/assets/Logos/black-hq.png"
            alt="E Logo Small"
          />
        </div>
        {isMobileMenuOpen && (
          <button 
            className="ml-auto text-gray-400 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <nav className="mt-4 px-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-xl mb-1 ${
                isActive
                  ? "text-white bg-[#D8798F] font-medium"
                  : "text-gray-600 hover:bg-[#D8798F] hover:text-white"
              }`
            }
          >
            {link.icon}
            <span>{link.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="max-h-screen flex flex-col md:flex-row p-2 sm:p-4 gap-4">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 animate-slide-right">
            <Sidebar className="h-full" />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Top Header */}
        <header className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between gap-4">
            <button 
              className="md:hidden text-gray-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 flex items-center gap-4 bg-gray-300/50 rounded-lg px-4 py-2 max-w-md">
              <Search className="w-4 h-4 text-gray-900 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search"
                className="text-sm text-gray-900/50 bg-transparent outline-none w-full min-w-0"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <button
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-50 rounded-lg hover:bg-[#D8798F] transition-colors"
                  onClick={() => navigate("/admin/notifications")}
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-50 rounded-lg hover:bg-[#D8798F] transition-colors"
                onClick={() => navigate("/admin/messages")}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm p-4 sm:p-6 overflow-auto max-h-[calc(100vh-185px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;