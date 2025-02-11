import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import FavouritesPage from "./pages/FavouritesPage";
import About from "./pages/About";
import SizeChart from "./pages/SizeChart";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { FavouritesProvider } from "./components/FavouritesContext";
import { CartProvider } from "./components/CartContext"; 
import Sales from "./pages/Sales";
import Details from "./pages/Details";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/favourites-page" element={<FavouritesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/size-chart" element={<SizeChart />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>

          <Footer />
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};

export default App;
