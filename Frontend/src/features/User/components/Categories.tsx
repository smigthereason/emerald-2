import Jack from "/src/assets/icons/jacket.png"
import Dress from "/src/assets/icons/dress.png"
import Heels from "/src/assets/icons/heels.png"
import Tops from "/src/assets/icons/blouse.png"
import Skirt from "/src/assets/icons/skirt.png"
import Jeans from "/src/assets/icons/jeans.png"

const Categories = () => {
  const categories = [
    { name: "TOPS", icon:<img src={Tops} alt="tops" className="w-32 h-32 mb-4 filter invert" />},
    { name: "JEANS", icon:<img src={Jeans} alt="jeans" className="w-32 h-32 mb-4 filter invert" />},
    { name: "JACKETS", icon:<img src={Jack} alt="jacket" className="w-32 h-32 mb-4 filter invert" /> },
    { name: "SKIRTS", icon:<img src={Skirt} alt="skirts" className="w-32 h-32 mb-4 filter invert" />},
    { name: "DRESSES", icon:<img src={Dress} alt="dress" className="w-32 h-32 mb-4 filter invert" />},
    { name: "SHOES", icon:<img src={Heels} alt="heels" className="w-32 h-32 mb-4 filter invert" />},
  ];

  return (
    <div className="py-8">
      {/* Title Section */}
      <h2 className="text-center text-2xl font-light mb-4">
        <span className="text-black font-bold">further </span>categories
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 border-black w-16 "></div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-row-1 gap-6 max-w-4xl mx-auto sm:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-black text-white flex flex-col justify-center items-center p-6 rounded-lg hover:bg-black/75 transition-all"
          >
            <div className="text-lg sm:text-5xl mb-4">{category.icon}</div>
            <h3 className=" text-xl sm:text-lg font-bold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
