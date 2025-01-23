import Hero from "../components/Hero"
import Products from "../components/Products"
import Categories from "../components/categories"
import Offers from "../components/offers"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="home ">
     <Hero />
     <Products />
     <Categories />
     <Offers />
     <Footer />
    </div>
  );
};

export default Home;