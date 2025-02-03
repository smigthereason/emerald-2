import Hero from "../components/Hero"
import Products from "../components/Products"
import Categories from "../components/Categories"
import Offers from "../components/offers"

const Home = () => {
  return (
    <div className="home ">
     <Hero />
     <Products />
     <Categories />
     <Offers />
    </div>
  );
};

export default Home;