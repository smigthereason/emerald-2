// import "./App.css";
// import Navbar from "./features/User/components/Navbar";
// import Footer from "./features/User/components/Footer";
// import Home from "./features/User/pages/Home";
// import SearchResults from "./Shared/pages/Searches/SearchResults";
// import ProductDetail from "./Shared/pages/ProductDetails/ProductDetail";
// import FavouritesPage from "./features/User/pages/FavouritesPage";
// import About from "./features/User/pages/About";
// import SizeChart from "./features/User/pages/SizeChart";
// import PrivacyPolicy from "./features/User/pages/PrivacyPolicy";
// import Login from "./Shared/pages/Logins/Login";
// import Cart from "./features/User/pages/Cart";
// import Contact from "./features/User/pages/Contact";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { FavouritesProvider } from "./Shared/hooks/FavouritesContext";
// import { CartProvider } from "./Shared/hooks/CartContext"; 
// import Sales from "./features/User/pages/Sales";
// import Details from "./features/User/pages/Details";

// const App: React.FC = () => {
//   return (
//     <FavouritesProvider>
//       <CartProvider>
//         <Router>
//           <Navbar />

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<SearchResults />} />
//             <Route path="/product-detail" element={<ProductDetail />} />
//             <Route path="/favourites-page" element={<FavouritesPage />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/size-chart" element={<SizeChart />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/sales" element={<Sales />} />
//             <Route path="/details/:id" element={<Details />} />
//           </Routes>

//           <Footer />
//         </Router>
//       </CartProvider>
//     </FavouritesProvider>
//   );
// };

// export default App;
// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FavouritesProvider } from "./Shared/hooks/FavouritesContext";
import { CartProvider } from "./Shared/hooks/CartContext";

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import ClientLayout from "./Layout/UserLayout";

// Shared Pages
import SearchResults from "./Shared/pages/Searches/SearchResults";
import ProductDetail from "./Shared/pages/ProductDetails/ProductDetail";
import Login from "./Shared/pages/Logins/Login";

// Admin Pages
import Dashboard from "./features/Admin/Dashboard";
import Orders from "./features/Admin/Orders";
import Products from "./features/Admin/Products";
import Customers from "./features/Admin/Customers";
import Stats from "./features/Admin/Stats";
// import Settings from "./features/Admin/Settings";

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

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="statistics" element={<Stats />} />
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="products" element={<Products />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="product-detail" element={<ProductDetail />} />
            </Route>

            {/* Auth Route */}
            <Route path="/login" element={<Login />} />
           

            {/* Client Routes */}
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<Home />} />
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
              
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};

export default App;