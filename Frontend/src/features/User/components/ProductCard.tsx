import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { motion } from "framer-motion";

interface Product {
  discount: number;
  id: string;
  title: string;
  brief: string;
  color: string[];
  size: string[];
  price: string;
  image: string;
  tag: string;
}

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin = false,
}) => {
  const { favourites, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isAdmin) {
      navigate(`/admin/product/${product.id}`);
    } else {
      navigate(`/product-detail/${product.id}`);
    }
  };

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavourite(product.id);
  };

  // State for expanding/collapsing brief text
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 50;

  const toggleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking from navigating away
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="box bg-white  overflow-hidden border h-[650px] sm:h-auto rounded-lg shadow-lg cursor-pointer "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="relative group top-0">
        <img
          className="w-56 sm:w-full h-[350px] sm:h-[400px] object-contain mx-auto mt-2 sm:mt-8 rounded-lg"
          src={product.image}
          alt={product.title}
        />

        {/* Hover Icons for Large Screens */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button onClick={handleFavouriteClick}>
              {favourites.includes(product.id) ? (
                <MdFavorite className="text-red-500 text-5xl" />
              ) : (
                <MdFavoriteBorder className="text-white text-5xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Icons */}
      <div className="relative flex -top-8 sm:hidden justify-center space-x-6 m-4 p-2">
        <button onClick={(e) => e.stopPropagation()}>
          <IoEyeSharp className="text-black text-3xl" />
        </button>
        <button onClick={handleFavouriteClick}>
          {favourites.includes(product.id) ? (
            <MdFavorite className="text-red-500 text-3xl" />
          ) : (
            <MdFavoriteBorder className="text-black text-3xl" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-4 relative bottom-12 sm:bottom-0">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{product.title}</h3>

        {/* Brief Text with "Read More" Toggle */}
        <p className="text-sm text-gray-900 mb-4">
          {isExpanded
            ? product.brief
            : `${product.brief.slice(0, maxLength)}...`}
          {product.brief.length > maxLength && (
            <button
              onClick={toggleReadMore}
              className="ml-1 text-gray-900/50 transition-transform duration-300 hover:-translate-y-1"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="flex flex-col justify-between items-center space-y-4">
          <span className="text-lg sm:text-2xl font-light">
            {product.price}
          </span>
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-16">
            <button
              className="px-4 py-2 border transition-transform duration-300 hover:-translate-y-1 border-[#d66161] text-[#d66161] rounded-full text-sm hover:bg-[#d66161] hover:text-white "
              onClick={handleCardClick}
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
