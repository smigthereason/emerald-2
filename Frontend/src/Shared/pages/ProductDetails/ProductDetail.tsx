import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../Shared/hooks/CartContext";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { IoArrowBack } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../../data/products";

// Type definitions
export interface Product {
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

interface CartContextType {
  addToCart: (product: Product) => void;
}

interface FavouritesContextType {
  favourites: string[];
  toggleFavourite: (id: string) => void;
}

interface ImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
  onError: () => void;
  className?: string;
}

// Helper Components
const ProductImage: React.FC<ImageProps> = ({ src, alt, isHovered, onError, className }) => (
  <img
    src={src}
    alt={alt}
    className={`max-w-[250px] h-auto object-contain transition-transform duration-500 ${className}`}
    onError={onError}
    style={{
      transform: isHovered ? "rotate(-35deg) translateX(-20px)" : "none",
    }}
  />
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart() as CartContextType;
  const { favourites, toggleFavourite } = useFavourites() as FavouritesContextType;
  const navigate = useNavigate();
  
  // State
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Find product
  const product = products.find((p: Product) => p.id === id);

  // Image URL handler
  const getImageUrl = (imagePath: string): string => {
    try {
      return imagePath.startsWith('http') ? imagePath : imagePath;
    } catch (error) {
      console.error('Error loading image:', error);
      return '/placeholder-product.png';
    }
  };

  // Event handlers
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (product) addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (product) {
      addToCart(product);
      navigate("/checkout");
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (product) toggleFavourite(product.id);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-400 to-white pb-20">
      <div className="container mx-auto p-6">
        <button
          className="mb-6 text-lg flex items-center text-white hover:text-sky-100 transition-colors"
          onClick={() => navigate(-1)}
          type="button"
        >
          <IoArrowBack className="mr-2" /> Back
        </button>

        <div
          className="relative bg-transparent shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: isHovered ? "100%" : "300px",
            height: "480px",
          }}
        >
          {/* Image Section */}
          <motion.div
            className="absolute left-0 top-0 w-[300px] h-full bg-white flex items-center justify-center p-8 z-10"
            animate={{
              rotate: isHovered ? -5 : 0,
              scale: isHovered ? 0.95 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {!imageError ? (
                <ProductImage
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  isHovered={isHovered}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm">{product.title}</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="absolute left-[300px] top-0 w-[calc(100%-300px)] h-full bg-sky-400 p-8"
            initial={{ x: -300 }}
            animate={{ x: isHovered ? 0 : -300 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">
              <h3 className="text-2xl font-semibold uppercase mb-1">
                {product.title}
              </h3>
              <span className="text-sm opacity-85">{product.tag}</span>

              <h4 className="mt-6 mb-2 uppercase font-semibold">Product Details</h4>
              <p className="text-sm opacity-85">{product.brief}</p>

              <h4 className="mt-6 mb-3 uppercase font-semibold">Available Sizes</h4>
              <ul className="flex gap-3">
                {product.size.map((size) => (
                  <li
                    key={size}
                    className="w-10 h-10 border-2 border-white flex items-center justify-center text-sm opacity-50 hover:opacity-100 hover:bg-white hover:text-sky-400 cursor-pointer transition-all duration-300"
                  >
                    {size}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mt-8">
                <div className="text-3xl font-semibold">
                  {product.price}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleFavoriteToggle}
                    className="bg-white text-sky-400 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors duration-300"
                    type="button"
                  >
                    {favourites.includes(product.id) ? (
                      <MdFavorite className="text-red-500 text-2xl" />
                    ) : (
                      <MdFavoriteBorder className="text-sky-400 text-2xl" />
                    )}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="bg-white text-sky-400 px-6 py-2 uppercase text-sm font-semibold hover:bg-sky-100 transition-colors duration-300"
                    type="button"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-white text-sky-400 px-6 py-2 uppercase text-sm font-semibold hover:bg-sky-100 transition-colors duration-300"
                    type="button"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;