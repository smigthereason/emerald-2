// Products.tsx
import React from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavourites } from "./FavouritesContext";

interface Product {
  id: string;
  title: string;
  brief: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: "product1",
    title: "Product 1",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p5.jpeg",
  },
  {
    id: "product2",
    title: "Product 2",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p4.jpeg",
  },
  {
    id: "product3",
    title: "Product 3",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p6.jpeg",
  },
  {
    id: "product4",
    title: "Product 4",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p7.jpeg",
  },
  {
    id: "product5",
    title: "Product 5",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p12.jpeg",
  },
  {
    id: "product6",
    title: "Product 6",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p13.jpeg",
  },
  // Add additional products as needed…
];

const Products: React.FC = () => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <div className="py-8">
      {/* Title Section */}
      <h2 className="text-center text-2xl font-light mb-4">
        <span className="text-black font-bold">featured </span>items
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 border-black w-16"></div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white overflow-hidden border">
            <div className="relative group">
              <img
                className="w-full h-[400px] object-contain mt-8"
                src={product.image}
                alt={product.title}
              />
              {/* Overlay with two icons */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
                  {/* Eye icon links to the product detail page */}
                  <Link to={`/${product.id}`}>
                    <IoEyeSharp className="text-white text-4xl" />
                  </Link>
                  {/* Favourite icon toggles favourite state */}
                  <button
                    onClick={(e) => {
                      // Prevent the click from propagating to the Link
                      e.preventDefault();
                      toggleFavourite(product.id);
                    }}
                  >
                    {favourites.includes(product.id) ? (
                      <MdFavorite className="text-red-500 text-3xl" />
                    ) : (
                      <MdFavoriteBorder className="text-white text-3xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-500 mb-4">{product.brief}</p>
              <div className="flex flex-col justify-between items-center space-y-4">
                <span className="text-2xl font-bold">{product.price}</span>
                <div className="flex flex-row justify-evenly items-center gap-16">
                  <Link
                    to={`/${product.id}`}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
                  >
                    Add to Cart
                  </Link>
                  <Link
                    to={`/${product.id}`}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
