import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Shared/hooks/AuthContext";
import { CartProvider } from "./Shared/hooks/CartContext";
import { FavouritesProvider } from "./Shared/hooks/FavouritesContext";
import { ThemeProvider } from "./Shared/hooks/ThemeContext";

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import ClientLayout from "./Layout/UserLayout";

// Shared Pages
import Login from "./Shared/pages/Logins/Login";
import ProductDetail from "./Shared/pages/ProductDetails/ProductDetail";
import SearchResults from "./Shared/pages/Searches/SearchResults";

// Admin Pages
import Customers from "./features/Admin/pages/Customers";
import Dashboard from "./features/Admin/pages/Dashboard";
import Feedback from "./features/Admin/pages/Feedback";
import Messages from "./features/Admin/pages/Messages";
import Notifications from "./features/Admin/pages/Notifications";
import Orders from "./features/Admin/pages/Orders";
import Products from "./features/Admin/pages/Products";
import Reviews from "./features/Admin/pages/Reviews";
import Settings from "./features/Admin/pages/Settings";
import Stats from "./features/Admin/pages/Stats";
import Transactions from "./features/Admin/pages/Transactions";

// Client Pages
import About from "./features/User/pages/About";
import Cart from "./features/User/pages/Cart";
import Contact from "./features/User/pages/Contact";
import Details from "./features/User/pages/Details";
import Dresses from "./features/User/pages/Dresses";
import FavouritesPage from "./features/User/pages/FavouritesPage";
import Home from "./features/User/pages/Home";
import Jackets from "./features/User/pages/Jackets";
import Pants from "./features/User/pages/Pants";
import PrivacyPolicy from "./features/User/pages/PrivacyPolicy";
import Profile from "./features/User/pages/Profile";
import Sales from "./features/User/pages/Sales";
import Shoes from "./features/User/pages/Shoes";
import SizeChart from "./features/User/pages/SizeChart";
import Skirts from "./features/User/pages/Skirts";
import Tops from "./features/User/pages/Tops";

const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element; adminOnly?: boolean }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App: React.FC = () => {
  const AdminWrapper: React.FC = () => (
    <div className="admin">
      <AdminLayout />
    </div>
  );

  return (
    <ThemeProvider>
      <FavouritesProvider>
        <CartProvider>
            <Router>
          <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />

                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminWrapper />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  {/* Other admin routes... */}
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="statistics" element={<Stats />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="products" element={<Products />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="product-detail" element={<ProductDetail />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>

                {/* User routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <ClientLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  {/* Other user routes... */}
                  <Route path="search" element={<SearchResults />} />
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

                {/* Root redirect */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      {useAuth().user?.role === "admin" ? (
                        <Navigate to="/admin/dashboard" replace />
                      ) : (
                        <Navigate to="/" replace />
                      )}
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </AuthProvider>
            </Router>
        </CartProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
};

export default App;

// src/App.tsx
// import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
// import { AuthProvider, useAuth } from "./Shared/hooks/AuthContext"; // Import useAuth
// import { CartProvider } from "./Shared/hooks/CartContext";
// import { FavouritesProvider } from "./Shared/hooks/FavouritesContext";
// import { ThemeProvider } from "./Shared/hooks/ThemeContext";
// import { UserProvider } from "./Shared/hooks/userContext";

// // Layouts
// import AdminLayout from "./Layout/AdminLayout";
// import ClientLayout from "./Layout/UserLayout";

// // Shared Pages
// import Login from "./Shared/pages/Logins/Login";
// import ProductDetail from "./Shared/pages/ProductDetails/ProductDetail";
// import SearchResults from "./Shared/pages/Searches/SearchResults";

// // Admin Pages
// import Customers from "./features/Admin/pages/Customers";
// import Dashboard from "./features/Admin/pages/Dashboard";
// import Feedback from "./features/Admin/pages/Feedback";
// import Messages from "./features/Admin/pages/Messages";
// import Notifications from "./features/Admin/pages/Notifications";
// import Orders from "./features/Admin/pages/Orders";
// import Products from "./features/Admin/pages/Products";
// import Reviews from "./features/Admin/pages/Reviews";
// import Settings from "./features/Admin/pages/Settings";
// import Stats from "./features/Admin/pages/Stats";
// import Transactions from "./features/Admin/pages/Transactions";

// // Client Pages
// import About from "./features/User/pages/About";
// import Cart from "./features/User/pages/Cart";
// import Contact from "./features/User/pages/Contact";
// import Details from "./features/User/pages/Details";
// import Dresses from "./features/User/pages/Dresses";
// import FavouritesPage from "./features/User/pages/FavouritesPage";
// import Home from "./features/User/pages/Home";
// import Jackets from "./features/User/pages/Jackets";
// import Pants from "./features/User/pages/Pants";
// import PrivacyPolicy from "./features/User/pages/PrivacyPolicy";
// import Profile from "./features/User/pages/Profile";
// import Sales from "./features/User/pages/Sales";
// import Shoes from "./features/User/pages/Shoes";
// import SizeChart from "./features/User/pages/SizeChart";
// import Skirts from "./features/User/pages/Skirts";
// import Tops from "./features/User/pages/Tops";

// // Protected Route Component
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// const App: React.FC = () => {
//   // Wrap AdminLayout with a container that has the "admin" class
//   const AdminWrapper: React.FC = () => (
//     <div className="admin">
//       <AdminLayout />
//     </div>
//   );

//   return (
//     <ThemeProvider>
//       <FavouritesProvider>
//         <CartProvider>
//           <AuthProvider>
//             <UserProvider>
//               <Router>
//                 <Routes>
//                   {/* Login Route (unprotected) */}
//                   <Route path="/login" element={<Login />} />

//                   {/* Admin Routes (protected) */}
//                   <Route
//                     path="/admin"
//                     element={
//                       <ProtectedRoute>
//                         <AdminWrapper />
//                       </ProtectedRoute>
//                     }
//                   >
//                     <Route index element={<Navigate to="/admin/dashboard" replace />} />
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="orders" element={<Orders />} />
//                     <Route path="customers" element={<Customers />} />
//                     <Route path="statistics" element={<Stats />} />
//                     <Route path="reviews" element={<Reviews />} />
//                     <Route path="settings" element={<Settings />} />
//                     <Route path="products" element={<Products />} />
//                     <Route path="feedback" element={<Feedback />} />
//                     <Route path="search" element={<SearchResults />} />
//                     <Route path="transactions" element={<Transactions />} />
//                     <Route path="product-detail" element={<ProductDetail />} />
//                     <Route path="messages" element={<Messages />} />
//                     <Route path="notifications" element={<Notifications />} />
//                   </Route>

//                   {/* Client Routes (protected) */}
//                   <Route
//                     path="/"
//                     element={
//                       <ProtectedRoute>
//                         <ClientLayout />
//                       </ProtectedRoute>
//                     }
//                   >
//                     <Route index element={<Home />} />
//                     <Route path="search" element={<SearchResults />} />
//                     <Route path="favourites-page" element={<FavouritesPage />} />
//                     <Route path="about" element={<About />} />
//                     <Route path="size-chart" element={<SizeChart />} />
//                     <Route path="privacy-policy" element={<PrivacyPolicy />} />
//                     <Route path="cart" element={<Cart />} />
//                     <Route path="contact" element={<Contact />} />
//                     <Route path="sales" element={<Sales />} />
//                     <Route path="details/:id" element={<Details />} />
//                     <Route path="profile" element={<Profile />} />
//                     <Route path="tops" element={<Tops />} />
//                     <Route path="pants" element={<Pants />} />
//                     <Route path="dresses" element={<Dresses />} />
//                     <Route path="jackets" element={<Jackets />} />
//                     <Route path="skirts" element={<Skirts />} />
//                     <Route path="shoes" element={<Shoes />} />
//                     <Route path="product-detail/:id" element={<ProductDetail />} />
//                   </Route>

//                   {/* Redirect root to login by default */}
//                   <Route path="/" element={<Navigate to="/login" replace />} />

//                   {/* Catch all route */}
//                   <Route path="*" element={<Navigate to="/login" replace />} />
//                 </Routes>
//               </Router>
//             </UserProvider>
//           </AuthProvider>
//         </CartProvider>
//       </FavouritesProvider>
//     </ThemeProvider>
//   );
// };

// export default App;