import Hero from "../components/Hero";
// import Products from "../components/Products";
import Pt from "../components/Pt";
import Categories from "../components/Categories";
import Offers from "../components/offers"; // Ensure the file name is correct (case-sensitive)

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Pt/>
      {/* <Products /> */}
      <Categories />
      <Offers />
    </div>
  );
};

export default Home;