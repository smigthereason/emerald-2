import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import FavouritesPage from "./pages/FavouritesPage";
import About from "./pages/About";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { FavouritesProvider } from "./components/FavouritesContext";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/favourites-page" element={<FavouritesPage />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </FavouritesProvider>
  );
};

export default App;
