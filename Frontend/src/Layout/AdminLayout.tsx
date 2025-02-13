import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
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
  Menu
} from 'lucide-react';

interface SidebarLink {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const AdminLayout = () => {
  const location = useLocation();
  const isAuthenticated = true;
  const isAdmin = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const sidebarLinks: SidebarLink[] = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      title: 'Products',
      path: '/admin/products',
      icon: <Tag className="w-5 h-5" />
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      title: 'Customers',
      path: '/admin/customers',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Statistics',
      path: '/admin/statistics',
      icon: <BarChart2 className="w-5 h-5" />
    },
    {
      title: 'Reviews',
      path: '/admin/reviews',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: 'Transactions',
      path: '/admin/transactions',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex  p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-2xl shadow-sm">
      <div className="p-4 flex items-center gap-2">
        <div>
          
            {/* Logo for larger screens */}
            <img
              className="hidden sm:block h-auto w-60"
              src="/src/assets/Logos/e5.png"
              alt="E Logo"
            />
            {/* Logo for smaller screens */}
            <img
              className="block sm:hidden h-16 w-16 relative right-24"
              src="/src/assets/Logos/black-hq.png"
              alt="E Logo Small"
            />
          
        </div>
          <button className=" block sm:hidden ml-auto text-gray-400">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 px-2">
          {sidebarLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-xl mb-1 ${
                isActivePath(link.path)
                  ? 'text-white bg-[#D8798F] font-medium'
                  : 'text-gray-600 hover:bg-[#D8798F] hover:text-white'
              }`}
            >
              {link.icon}
              <span>{link.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col gap-4">
        {/* Top Header */}
        <header className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 w-96 bg-gray-300/50 rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-gray-900" />
              <input
                type="text"
                placeholder="Search"
                className="text-sm text-gray-900/50 bg-transparent outline-none w-full"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-50 rounded-lg hover:bg-[#D8798F] transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-50 rounded-lg hover:bg-[#D8798F] transition-colors">
                <Mail className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;