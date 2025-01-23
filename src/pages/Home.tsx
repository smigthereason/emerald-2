import Hero from "../components/Hero"
import Products from "../components/Products"
import Categories from "../components/categories"
import Offers from "../components/offers"

const Home = () => {
  return (
    <div className="home space-y-20">
     <Hero />
     <Products />
     <Categories />
     <Offers />
    </div>
  );
};

export default Home;