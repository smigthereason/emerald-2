import React, { useState, useEffect, useRef } from "react";
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
  isExpanded: boolean;
  onError: () => void;
  className?: string;
}

// Helper Components
const ProductImage: React.FC<ImageProps> = ({
  src,
  alt,
  isExpanded,
  onError,
  className,
}) => (
  <img
    src={src}
    alt={alt}
    className={`max-w-full h-auto object-contain transition-transform duration-700 ${className}`}
    onError={onError}
    style={{
      transform: isExpanded ? "rotate(-35deg) translateX(-20px)" : "none",
      maxWidth: "250px",
      transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother easing
    }}
  />
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { favourites, toggleFavourite } = useFavourites();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Find product
  const product = products.find((p: Product) => p.id === id);

  // Ensure a size is selected when product changes
  useEffect(() => {
    if (product && product.size.length > 0) {
      // If no size is selected, or the selected size is not in the product's available sizes
      if (!selectedSize || !product.size.includes(selectedSize)) {
        setSelectedSize(product.size[0]); // Default to first available size
      }
    }
  }, [product]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle clicks outside the product container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Image URL handler
  const getImageUrl = (imagePath: string): string => {
    try {
      return imagePath.startsWith("http") ? imagePath : imagePath;
    } catch (error) {
      console.error("Error loading image:", error);
      return "/placeholder-product.png";
    }
  };

  // Event handlers
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

// ProductDetail.tsx - handleAddToCart function
const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.stopPropagation();
  if (product && selectedSize) {
    // Pass the product WITH original sizes and the selectedSize separately
    addToCart({ ...product }, selectedSize);
  } else {
    alert("Please select a size before adding to cart!");
  }
};

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (product && selectedSize) {
      addToCart({ ...product, size: [selectedSize] });
      navigate("/checkout");
    } else {
      alert("Please select a size before buying!");
    }
  };

  const handleFavoriteToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    if (product) toggleFavourite(product.id);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl text-gray-600">Product not found.</div>
      </div>
    );
  }

  // Determine if card should show expanded state
  const showExpanded = isHovered || isExpanded;

  // Custom transition settings for smoother animations
  const smoothTransition = {
    type: "spring",
    stiffness: 50,
    damping: 14,
    duration: 0.7,
  };

  return (
    <div className="min-h-screen bg-gray-400 to-white pb-20 rounded-lg">
      <div className="container mx-auto p-4 md:p-6">
        <button
          className="mb-4 md:mb-6 text-lg flex items-center text-white hover:text-sky-100 transition-colors"
          onClick={() => navigate(-1)}
          type="button"
        >
          <IoArrowBack className="mr-2" /> Back
        </button>

        {/* Always visible product title */}
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase">
            {product.title}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative bg-transparent shadow-xl rounded-lg overflow-hidden mx-auto cursor-pointer"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={handleClick}
          style={{
            width: showExpanded || isMobile ? "100%" : "300px",
            height: isMobile ? "auto" : "480px",
            minHeight: isMobile ? "480px" : "auto",
            transition:
              "width 0.7s cubic-bezier(0.4, 0, 0.2, 1), height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Image Section - Starts centered, moves left on hover/click */}
          <motion.div
            className="absolute top-0 h-full bg-white flex items-center justify-center p-4 md:p-8 z-10"
            animate={{
              position: isMobile ? "relative" : "absolute",
              left: showExpanded && !isMobile ? "0" : isMobile ? "0" : "50%",
              width:
                showExpanded && !isMobile
                  ? "300px"
                  : isMobile
                  ? "100%"
                  : "300px",
              transform:
                showExpanded && !isMobile
                  ? "translateX(0) rotate(-5deg)"
                  : isMobile
                  ? "none"
                  : "translateX(-50%) rotate(0deg)",
              scale: showExpanded && !isMobile ? 0.95 : 1,
            }}
            transition={smoothTransition}
          >
            <AnimatePresence>
              {!imageError ? (
                <ProductImage
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  isExpanded={showExpanded && !isMobile}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                  <svg
                    className="w-16 h-16 md:w-24 md:h-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm">{product.title}</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="bg-white/20 p-4 md:p-8 text-black"
            initial={{
              x: isMobile ? 0 : -300,
              position: isMobile ? "relative" : "absolute",
              left: isMobile ? 0 : "300px",
              top: isMobile ? "auto" : 0,
              width: isMobile ? "100%" : "calc(100% - 300px)",
              height: isMobile ? "auto" : "100%",
            }}
            animate={{
              x: showExpanded || isMobile ? 0 : -300,
              marginTop: isMobile ? "1rem" : 0,
              display: isMobile && !showExpanded ? "none" : "block",
            }}
            transition={{
              ...smoothTransition,
              delay: isMobile ? 0 : 0.1, // Slight delay for staggered animation effect
            }}
          >
            <div>
              <h4 className="mt-2 mb-2 uppercase font-semibold">
                Product Details
              </h4>
              <span className="text-white italic text-sm opacity-85 mb-4">
                {product.tag}
              </span>
              <p className="text-sm opacity-85">{product.brief}</p>

              <h4 className="mt-4 md:mt-6 mb-2 md:mb-3 uppercase font-semibold">
                Available Sizes
              </h4>
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {product.size.map((size) => (
                  <li
                    key={size}
                    className={`w-8 h-8 md:w-10 md:h-10 border-2 ${
                      selectedSize === size
                        ? "border-red-500 bg-red-200"
                        : "border-white"
                    } flex items-center justify-center text-sm hover:opacity-100 hover:bg-white hover:text-[#d66161] cursor-pointer transition-all duration-300`}
                    onClick={() => handleSizeSelection(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 md:mt-8 gap-4">
                <div className="text-2xl md:text-3xl font-semibold">
                  {product.price}
                </div>

                <div className="flex flex-wrap gap-2 md:gap-4">
                  <button
                    onClick={handleFavoriteToggle}
                    className=" px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-sky-100 transition-all duration-300"
                    type="button"
                  >
                    {favourites.includes(product.id) ? (
                      <MdFavorite className="text-red-500 text-xl md:text-2xl" />
                    ) : (
                      <MdFavoriteBorder className="text-[#d66161] text-xl md:text-2xl" />
                    )}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="bg-white hover:bg-[#d66161] text-[#d66161] px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold  transition-all duration-300"
                    type="button"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-white hover:bg-[#d66161] text-[#d66161] px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold  transition-all duration-300"
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
