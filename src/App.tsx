// import './App.css'
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home'
// import SearchResults from './pages/SearchResults';
// import ProductDetail from './pages/ProductDetail';
// import FavouritesPage from './pages/FavouritesPage';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/search" element={<SearchResults />} />
//         <Route path="/product-detail" element={<ProductDetail />} />
//         <Route path="/favourites-page" element={<FavouritesPage />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// export default App;

import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import FavouritesPage from './pages/FavouritesPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FavouritesProvider } from './components/FavouritesContext'; // Adjust the path as needed

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
        </Routes>

        <Footer />
      </Router>
    </FavouritesProvider>
  );
};

export default App;
