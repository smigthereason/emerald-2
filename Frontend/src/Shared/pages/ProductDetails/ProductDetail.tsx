// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../../../Shared/hooks/CartContext";
// import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
// import { IoArrowBack } from "react-icons/io5";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";
// import { products } from "../../../data/products";

// // Type definitions
// export interface Product {
//   discount: number;
//   id: string;
//   title: string;
//   brief: string;
//   color: string[];
//   size: string[];
//   price: string;
//   image: string;
//   tag: string;
// }

// interface CartContextType {
//   addToCart: (product: Product) => void;
// }

// interface FavouritesContextType {
//   favourites: string[];
//   toggleFavourite: (id: string) => void;
// }

// interface ImageProps {
//   src: string;
//   alt: string;
//   isHovered: boolean;
//   onError: () => void;
//   className?: string;
// }

// // Helper Components
// const ProductImage: React.FC<ImageProps> = ({ src, alt, isHovered, onError, className }) => (
//   <img
//     src={src}
//     alt={alt}
//     className={`max-w-[250px] h-auto object-contain transition-transform duration-500 ${className}`}
//     onError={onError}
//     style={{
//       transform: isHovered ? "rotate(-35deg) translateX(-20px)" : "none",
//     }}
//   />
// );

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { addToCart } = useCart() as CartContextType;
//   const { favourites, toggleFavourite } = useFavourites() as FavouritesContextType;
//   const navigate = useNavigate();
  
//   // State
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const [imageError, setImageError] = useState<boolean>(false);

//   // Find product
//   const product = products.find((p: Product) => p.id === id);

//   // Image URL handler
//   const getImageUrl = (imagePath: string): string => {
//     try {
//       return imagePath.startsWith('http') ? imagePath : imagePath;
//     } catch (error) {
//       console.error('Error loading image:', error);
//       return '/placeholder-product.png';
//     }
//   };

//   // Event handlers
//   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.stopPropagation();
//     if (product) addToCart(product);
//   };

//   const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.stopPropagation();
//     if (product) {
//       addToCart(product);
//       navigate("/checkout");
//     }
//   };

//   const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.stopPropagation();
//     if (product) toggleFavourite(product.id);
//   };

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-xl text-gray-600">Product not found.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-400 to-white pb-20">
//       <div className="container mx-auto p-6">
//         <button
//           className="mb-6 text-lg flex items-center text-white hover:text-sky-100 transition-colors"
//           onClick={() => navigate(-1)}
//           type="button"
//         >
//           <IoArrowBack className="mr-2" /> Back
//         </button>

//         <div
//           className="relative bg-transparent shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           style={{
//             width: isHovered ? "100%" : "300px",
//             height: "480px",
//           }}
//         >
//           {/* Image Section */}
//           <motion.div
//             className="absolute left-0 top-0 w-[300px] h-full bg-white flex items-center justify-center p-8 z-10"
//             animate={{
//               rotate: isHovered ? -5 : 0,
//               scale: isHovered ? 0.95 : 1,
//             }}
//             transition={{ duration: 0.5 }}
//           >
//             <AnimatePresence>
//               {!imageError ? (
//                 <ProductImage
//                   src={getImageUrl(product.image)}
//                   alt={product.title}
//                   isHovered={isHovered}
//                   onError={() => setImageError(true)}
//                 />
//               ) : (
//                 <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
//                   <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <p className="mt-2 text-sm">{product.title}</p>
//                 </div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Details Section */}
//           <motion.div
//             className="absolute left-[300px] top-0 w-[calc(100%-300px)] h-full bg-sky-400 p-8"
//             initial={{ x: -300 }}
//             animate={{ x: isHovered ? 0 : -300 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="text-white">
//               <h3 className="text-2xl font-semibold uppercase mb-1">
//                 {product.title}
//               </h3>
//               <span className="text-sm opacity-85">{product.tag}</span>

//               <h4 className="mt-6 mb-2 uppercase font-semibold">Product Details</h4>
//               <p className="text-sm opacity-85">{product.brief}</p>

//               <h4 className="mt-6 mb-3 uppercase font-semibold">Available Sizes</h4>
//               <ul className="flex gap-3">
//                 {product.size.map((size) => (
//                   <li
//                     key={size}
//                     className="w-10 h-10 border-2 border-white flex items-center justify-center text-sm opacity-50 hover:opacity-100 hover:bg-white hover:text-sky-400 cursor-pointer transition-all duration-300"
//                   >
//                     {size}
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex justify-between items-center mt-8">
//                 <div className="text-3xl font-semibold">
//                   {product.price}
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={handleFavoriteToggle}
//                     className="bg-white text-sky-400 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors duration-300"
//                     type="button"
//                   >
//                     {favourites.includes(product.id) ? (
//                       <MdFavorite className="text-red-500 text-2xl" />
//                     ) : (
//                       <MdFavoriteBorder className="text-sky-400 text-2xl" />
//                     )}
//                   </button>

//                   <button
//                     onClick={handleAddToCart}
//                     className="bg-white text-sky-400 px-6 py-2 uppercase text-sm font-semibold hover:bg-sky-100 transition-colors duration-300"
//                     type="button"
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyNow}
//                     className="bg-white text-sky-400 px-6 py-2 uppercase text-sm font-semibold hover:bg-sky-100 transition-colors duration-300"
//                     type="button"
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

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
const ProductImage: React.FC<ImageProps> = ({ src, alt, isExpanded, onError, className }) => (
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
  const { addToCart } = useCart() as CartContextType;
  const { favourites, toggleFavourite } = useFavourites() as FavouritesContextType;
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Find product
  const product = products.find((p: Product) => p.id === id);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle clicks outside the product container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    duration: 0.7
  };

  return (
    <div className="min-h-screen bg-gray-400/50 to-white pb-20 rounded-lg">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase">{product.title}</h2>
          
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
            transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1), height 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {/* Image Section - Starts centered, moves left on hover/click */}
          <motion.div
            className="absolute top-0 h-full bg-white flex items-center justify-center p-4 md:p-8 z-10"
            animate={{
              position: isMobile ? "relative" : "absolute",
              left: showExpanded && !isMobile ? "0" : isMobile ? "0" : "50%",
              width: showExpanded && !isMobile ? "300px" : isMobile ? "100%" : "300px",
              transform: showExpanded && !isMobile ? "translateX(0) rotate(-5deg)" : isMobile ? "none" : "translateX(-50%) rotate(0deg)",
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
                  <svg className="w-16 h-16 md:w-24 md:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm">{product.title}</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="bg-sky-400 p-4 md:p-8 text-white"
            initial={{ 
              x: isMobile ? 0 : -300,
              position: isMobile ? "relative" : "absolute",
              left: isMobile ? 0 : "300px",
              top: isMobile ? "auto" : 0,
              width: isMobile ? "100%" : "calc(100% - 300px)",
              height: isMobile ? "auto" : "100%",
            }}
            animate={{ 
              x: (showExpanded || isMobile) ? 0 : -300,
              marginTop: isMobile ? "1rem" : 0,
              display: isMobile && !showExpanded ? "none" : "block",
            }}
            transition={{
              ...smoothTransition,
              delay: isMobile ? 0 : 0.1, // Slight delay for staggered animation effect
            }}
          >
            <div>
              <h4 className="mt-2 mb-2 uppercase font-semibold">Product Details</h4>
              <span className="text-white italic text-sm opacity-85 mb-4">{product.tag}</span>
              <p className="text-sm opacity-85">{product.brief}</p>

              <h4 className="mt-4 md:mt-6 mb-2 md:mb-3 uppercase font-semibold">Available Sizes</h4>
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {product.size.map((size) => (
                  <li
                    key={size}
                    className="w-8 h-8 md:w-10 md:h-10 border-2 border-white flex items-center justify-center text-sm opacity-50 hover:opacity-100 hover:bg-white hover:text-sky-400 cursor-pointer transition-all duration-300"
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
                    className="bg-white text-sky-400 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-sky-100 transition-all duration-300"
                    type="button"
                  >
                    {favourites.includes(product.id) ? (
                      <MdFavorite className="text-red-500 text-xl md:text-2xl" />
                    ) : (
                      <MdFavoriteBorder className="text-sky-400 text-xl md:text-2xl" />
                    )}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="bg-white text-sky-400 px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold hover:bg-sky-100 transition-all duration-300"
                    type="button"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-white text-sky-400 px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold hover:bg-sky-100 transition-all duration-300"
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