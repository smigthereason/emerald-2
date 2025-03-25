// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FavouritesProvider } from "./Shared/hooks/FavouritesContext";
import { CartProvider } from "./Shared/hooks/CartContext";
import { ThemeProvider } from "./Shared/hooks/ThemeContext";
import { AuthProvider } from "./Shared/hooks/AuthContext"; // Ensure AuthProvider is imported

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import ClientLayout from "./Layout/UserLayout";

// Shared Pages
import SearchResults from "./Shared/pages/Searches/SearchResults";
import ProductDetail from "./Shared/pages/ProductDetails/ProductDetail";
import Login from "./Shared/pages/Logins/Login";

// Admin Pages
import Dashboard from "./features/Admin/pages/Dashboard";
import Orders from "./features/Admin/pages/Orders";
import Products from "./features/Admin/pages/Products";
import Customers from "./features/Admin/pages/Customers";
import Stats from "./features/Admin/pages/Stats";
import Reviews from "./features/Admin/pages/Reviews";
import Transactions from "./features/Admin/pages/Transactions";
import Settings from "./features/Admin/pages/Settings";
import Messages from "./features/Admin/pages/Messages";
import Notifications from "./features/Admin/pages/Notifications";

// Client Pages
import Home from "./features/User/pages/Home";
import FavouritesPage from "./features/User/pages/FavouritesPage";
import About from "./features/User/pages/About";
import SizeChart from "./features/User/pages/SizeChart";
import PrivacyPolicy from "./features/User/pages/PrivacyPolicy";
import Cart from "./features/User/pages/Cart";
import Contact from "./features/User/pages/Contact";
import Sales from "./features/User/pages/Sales";
import Details from "./features/User/pages/Details";
import Profile from "./features/User/pages/Profile";
import Tops from "./features/User/pages/Tops";
import Pants from "./features/User/pages/Pants";
import Dresses from "./features/User/pages/Dresses";
import Jackets from "./features/User/pages/Jackets";
import Skirts from "./features/User/pages/Skirts";
import Shoes from "./features/User/pages/Shoes";

const App: React.FC = () => {
  // Wrap AdminLayout with a container that has the "admin" class
  const AdminWrapper: React.FC = () => (
    <div className="admin">
      <AdminLayout />
    </div>
  );

  return (
    <ThemeProvider>
      <FavouritesProvider>
        <CartProvider>
          <AuthProvider> {/* Wrap entire app with AuthProvider */}
            <Router>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminWrapper />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="statistics" element={<Stats />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="products" element={<Products />} />
                  <Route path="search" element={<SearchResults />} /> {/* Already in place */}
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="product-detail" element={<ProductDetail />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>

                {/* Auth Route */}
                <Route path="/login" element={<Login />} />

                {/* Client Routes */}
                <Route path="/" element={<ClientLayout />}>
                  <Route index element={<Home />} />
                  <Route path="search" element={<SearchResults />} /> {/* Already in place */}
                  <Route path="favourites-page" element={<FavouritesPage />} />
                  <Route path="about" element={<About />} />
                  <Route path="size-chart" element={<SizeChart />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="details/:id" element={<Details />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="tops" element={<Tops />} />
                  <Route path="pants" element={<Pants />} />
                  <Route path="dresses" element={<Dresses />} />
                  <Route path="jackets" element={<Jackets />} />
                  <Route path="skirts" element={<Skirts />} />
                  <Route path="shoes" element={<Shoes />} />
                  <Route path="product-detail/:id" element={<ProductDetail />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </CartProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
};

export default App;