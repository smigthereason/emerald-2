import Jack from "../assets/Images/jacket.png"
import Dress from "../assets/Images/dress.png"
import Heels from "../assets/Images/heels.png"
import Tops from "../assets/Images/blouse.png"
import Skirt from "../assets/Images/skirt.png"
import Jeans from "../assets/Images/jeans.png"

const Categories = () => {
  const categories = [
    { name: "TOPS", icon:<img src={Tops} alt="tops" className="w-32 h-32 mb-4 filter invert" />},
    { name: "JEANS", icon:<img src={Jeans} alt="jeans" className="w-32 h-32 mb-4 filter invert" />},
    { name: "JACKETs", icon:<img src={Jack} alt="jacket" className="w-32 h-32 mb-4 filter invert" /> },
    { name: "SKIRTS", icon:<img src={Skirt} alt="skirts" className="w-32 h-32 mb-4 filter invert" />},
    { name: "DRESSES", icon:<img src={Dress} alt="dress" className="w-32 h-32 mb-4 filter invert" />},
    { name: "HEELS", icon:<img src={Heels} alt="heels" className="w-32 h-32 mb-4 filter invert" />},
  ];

  return (
    <div className="py-8">
      {/* Title Section */}
      <h2 className="text-center text-2xl font-bold mb-4">
        <span className="text-black">further </span>categories
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 w-12"></div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-black text-white flex flex-col justify-center items-center p-6 rounded-lg hover:bg-black/75 transition-all"
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-bold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
