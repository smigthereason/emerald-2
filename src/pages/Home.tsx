import Hero from "../components/Hero";
import Products from "../components/Products"; // Corrected import
import Categories from "../components/Categories";
import Offers from "../components/offers"; // Ensure the file name is correct (case-sensitive)

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Products />
      <Categories />
      <Offers />
    </div>
  );
};

export default Home;