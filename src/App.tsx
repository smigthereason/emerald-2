import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        {/* <Route path="/contacts" element={<Contacts />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;

