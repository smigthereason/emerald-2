import { HashLink } from "react-router-hash-link";
import Title from "../components/Title";

import Jack from "/assets/icons/jacket.png";
import Dress from "/assets/icons/dress.png";
import Heels from "/assets/icons/heels.png";
import TopsIcon from "/assets/icons/blouse.png";
import Skirt from "/assets/icons/skirt.png";
import Jeans from "/assets/icons/jeans.png";

const Categories = () => {
  const categories = [
    {
      name: "TOPS",
      icon: (
        <img
          src={TopsIcon}
          alt="tops"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/tops#top",
    },
    {
      name: "PANTS",
      icon: (
        <img
          src={Jeans}
          alt="jeans"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/pants#pant",
    },
    {
      name: "JACKETS",
      icon: (
        <img
          src={Jack}
          alt="jacket"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/jackets#jacket",
    },
    {
      name: "SKIRTS",
      icon: (
        <img
          src={Skirt}
          alt="skirts"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/skirts#skirt",
    },
    {
      name: "DRESSES",
      icon: (
        <img
          src={Dress}
          alt="dress"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/dresses#dress",
    },
    {
      name: "SHOES",
      icon: (
        <img
          src={Heels}
          alt="heels"
          className="w-32 h-32 mb-4 filter invert"
        />
      ),
      route: "/shoes#shoe",
    },
  ];

  return (
    <div className="py-8">
      {/* Title Section */}
      
      <Title highlightText="further" mainText="categories" />

      {/* Grid Section */}
      <div className=" grid grid-row-1 gap-6 max-w-4xl mx-auto sm:grid-cols-3">
        {categories.map((category, index) => (
          <HashLink to={category.route} key={index}>
            <div className="category bg-black text-white flex flex-col justify-center items-center p-6 rounded-lg hover:bg-black/50 transition-transform duration-300 hover:-translate-y-1 ">
              <div className="text-lg sm:text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl sm:text-lg font-bold">{category.name}</h3>
            </div>
          </HashLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
