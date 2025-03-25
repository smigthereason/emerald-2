import Hero from "../components/Hero";
import Pt from "../components/Pt";
import Categories from "../components/Categories";
import Offers from "../components/offers"; 

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