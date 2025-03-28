// import React, { useState, useEffect, useRef } from "react";
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
//   isExpanded: boolean;
//   onError: () => void;
//   className?: string;
// }

// // Helper Components
// const ProductImage: React.FC<ImageProps> = ({
//   src,
//   alt,
//   isExpanded,
//   onError,
//   className,
// }) => (
//   <img
//     src={src}
//     alt={alt}
//     className={`max-w-full h-auto object-contain transition-transform duration-700 ${className}`}
//     onError={onError}
//     style={{
//       transform: isExpanded ? "rotate(-35deg) translateX(-20px)" : "none",
//       maxWidth: "250px",
//       transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother easing
//     }}
//   />
// );

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { addToCart } = useCart();
//   const { favourites, toggleFavourite } = useFavourites();
//   const navigate = useNavigate();
//   const containerRef = useRef<HTMLDivElement>(null);

//   // State
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);
//   const [imageError, setImageError] = useState<boolean>(false);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   // Find product
//   const product = products.find((p: Product) => p.id === id);

//   // Ensure a size is selected when product changes
//   useEffect(() => {
//     if (product && product.size.length > 0) {
//       // If no size is selected, or the selected size is not in the product's available sizes
//       if (!selectedSize || !product.size.includes(selectedSize)) {
//         setSelectedSize(product.size[0]); // Default to first available size
//       }
//     }
//   }, [product]);

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Handle clicks outside the product container
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsExpanded(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Image URL handler
//   const getImageUrl = (imagePath: string): string => {
//     try {
//       return imagePath.startsWith("http") ? imagePath : imagePath;
//     } catch (error) {
//       console.error("Error loading image:", error);
//       return "/placeholder-product.png";
//     }
//   };

//   // Event handlers
//   const handleSizeSelection = (size: string) => {
//     setSelectedSize(size);
//   };

// // ProductDetail.tsx - handleAddToCart function
// const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
//   e.stopPropagation();
//   if (product && selectedSize) {
//     // Pass the product WITH original sizes and the selectedSize separately
//     addToCart({ ...product }, selectedSize);
//   } else {
//     alert("Please select a size before adding to cart!");
//   }
// };

//   const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>): void => {
//     e.stopPropagation();
//     if (product && selectedSize) {
//       addToCart({ ...product, size: [selectedSize] });
//       navigate("/checkout");
//     } else {
//       alert("Please select a size before buying!");
//     }
//   };

//   const handleFavoriteToggle = (
//     e: React.MouseEvent<HTMLButtonElement>
//   ): void => {
//     e.stopPropagation();
//     if (product) toggleFavourite(product.id);
//   };

//   const handleClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-xl text-gray-600">Product not found.</div>
//       </div>
//     );
//   }

//   // Determine if card should show expanded state
//   const showExpanded = isHovered || isExpanded;

//   // Custom transition settings for smoother animations
//   const smoothTransition = {
//     type: "spring",
//     stiffness: 50,
//     damping: 14,
//     duration: 0.7,
//   };

//   return (
//     <div className="min-h-screen bg-gray-400 to-white pb-20 rounded-lg">
//       <div className="container mx-auto p-4 md:p-6">
//         <button
//           className="mb-4 md:mb-6 text-lg flex items-center text-white hover:text-sky-100 transition-colors"
//           onClick={() => navigate(-1)}
//           type="button"
//         >
//           <IoArrowBack className="mr-2" /> Back
//         </button>

//         {/* Always visible product title */}
//         <div className="mb-4 md:mb-6 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-white uppercase">
//             {product.title}
//           </h2>
//         </div>

//         <div
//           ref={containerRef}
//           className="relative bg-transparent shadow-xl rounded-lg overflow-hidden mx-auto cursor-pointer"
//           onMouseEnter={() => !isMobile && setIsHovered(true)}
//           onMouseLeave={() => !isMobile && setIsHovered(false)}
//           onClick={handleClick}
//           style={{
//             width: showExpanded || isMobile ? "100%" : "300px",
//             height: isMobile ? "auto" : "480px",
//             minHeight: isMobile ? "480px" : "auto",
//             transition:
//               "width 0.7s cubic-bezier(0.4, 0, 0.2, 1), height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         >
//           {/* Image Section - Starts centered, moves left on hover/click */}
//           <motion.div
//             className="absolute top-0 h-full bg-white flex items-center justify-center p-4 md:p-8 z-10"
//             animate={{
//               position: isMobile ? "relative" : "absolute",
//               left: showExpanded && !isMobile ? "0" : isMobile ? "0" : "50%",
//               width:
//                 showExpanded && !isMobile
//                   ? "300px"
//                   : isMobile
//                   ? "100%"
//                   : "300px",
//               transform:
//                 showExpanded && !isMobile
//                   ? "translateX(0) rotate(-5deg)"
//                   : isMobile
//                   ? "none"
//                   : "translateX(-50%) rotate(0deg)",
//               scale: showExpanded && !isMobile ? 0.95 : 1,
//             }}
//             transition={smoothTransition}
//           >
//             <AnimatePresence>
//               {!imageError ? (
//                 <ProductImage
//                   src={getImageUrl(product.image)}
//                   alt={product.title}
//                   isExpanded={showExpanded && !isMobile}
//                   onError={() => setImageError(true)}
//                 />
//               ) : (
//                 <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
//                   <svg
//                     className="w-16 h-16 md:w-24 md:h-24"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <p className="mt-2 text-sm">{product.title}</p>
//                 </div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Details Section */}
//           <motion.div
//             className="bg-white/20 p-4 md:p-8 text-black"
//             initial={{
//               x: isMobile ? 0 : -300,
//               position: isMobile ? "relative" : "absolute",
//               left: isMobile ? 0 : "300px",
//               top: isMobile ? "auto" : 0,
//               width: isMobile ? "100%" : "calc(100% - 300px)",
//               height: isMobile ? "auto" : "100%",
//             }}
//             animate={{
//               x: showExpanded || isMobile ? 0 : -300,
//               marginTop: isMobile ? "1rem" : 0,
//               display: isMobile && !showExpanded ? "none" : "block",
//             }}
//             transition={{
//               ...smoothTransition,
//               delay: isMobile ? 0 : 0.1, // Slight delay for staggered animation effect
//             }}
//           >
//             <div>
//               <h4 className="mt-2 mb-2 uppercase font-semibold">
//                 Product Details
//               </h4>
//               <span className="text-white italic text-sm opacity-85 mb-4">
//                 {product.tag}
//               </span>
//               <p className="text-sm opacity-85">{product.brief}</p>

//               <h4 className="mt-4 md:mt-6 mb-2 md:mb-3 uppercase font-semibold">
//                 Available Sizes
//               </h4>
//               <ul className="flex flex-wrap gap-2 md:gap-3">
//                 {product.size.map((size) => (
//                   <li
//                     key={size}
//                     className={`w-8 h-8 md:w-10 md:h-10 border-2 ${
//                       selectedSize === size
//                         ? "border-red-500 bg-red-200"
//                         : "border-white"
//                     } flex items-center justify-center text-sm hover:opacity-100 hover:bg-white hover:text-[#d66161] cursor-pointer transition-all duration-300`}
//                     onClick={() => handleSizeSelection(size)}
//                   >
//                     {size}
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 md:mt-8 gap-4">
//                 <div className="text-2xl md:text-3xl font-semibold">
//                   {product.price}
//                 </div>

//                 <div className="flex flex-wrap gap-2 md:gap-4">
//                   <button
//                     onClick={handleFavoriteToggle}
//                     className=" px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-sky-100 transition-all duration-300"
//                     type="button"
//                   >
//                     {favourites.includes(product.id) ? (
//                       <MdFavorite className="text-red-500 text-xl md:text-2xl" />
//                     ) : (
//                       <MdFavoriteBorder className="text-[#d66161] text-xl md:text-2xl" />
//                     )}
//                   </button>

//                   <button
//                     onClick={handleAddToCart}
//                     className="bg-white hover:bg-[#d66161] text-[#d66161] px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold  transition-all duration-300"
//                     type="button"
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyNow}
//                     className="bg-white hover:bg-[#d66161] text-[#d66161] px-4 py-2 md:px-6 md:py-2 uppercase text-xs md:text-sm font-semibold  transition-all duration-300"
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

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../Shared/hooks/CartContext";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { IoArrowBack } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  tag: string;
  colors: string[];
  sizes: string[];
  images: string[];
  category_id: number;
  created_at: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favourites, toggleFavourite } = useFavourites();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(
          `http://127.0.0.1:5000/products/${id}`
        );
        const productData = response.data;

        // Parse all array fields to ensure they're in the correct format
        const parseArrayField = (field: any): string[] => {
          if (Array.isArray(field)) return field;
          if (typeof field === "string") {
            try {
              return JSON.parse(field);
            } catch {
              return [];
            }
          }
          return [];
        };

        const parsedProduct = {
          ...productData,
          sizes: parseArrayField(productData.sizes),
          colors: parseArrayField(productData.colors),
          images: parseArrayField(productData.images),
        };

        setProduct(parsedProduct);
        setSelectedSize(parsedProduct.sizes[0] || null);
        setSelectedImage(parsedProduct.images[0] || "/fallback.jpg");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      // Add to backend
      const response = await axios.post(
        "http://127.0.0.1:5000/cart",
        {
          product_id: product.id,
          quantity: quantity,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Add to frontend cart context
        addToCart(
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] || "/fallback.jpg",
            quantity: quantity,
            size: selectedSize,
            uniqueId: `${product.id}-${selectedSize}`,
          },
          selectedSize,
          quantity
        );

        alert("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    }
  };
  const handleBuyNow = () => {
    if (!product || !selectedSize) {
      alert("Please select a size before buying!");
      return;
    }

    // Add to cart first
    addToCart({
      ...product,
      sizes: [selectedSize],
      quantity,
      id: product.id.toString(),
      image: product.images[0] || "/fallback.jpg",
    });

    // Then navigate to checkout
    navigate("/checkout");
  };

  const handleFavoriteToggle = () => {
    if (product) {
      toggleFavourite(product.id.toString());
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d66161]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-xl font-semibold text-red-500 mb-4">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-lg text-[#d66161] hover:text-[#b55050]"
        >
          <IoArrowBack className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-xl font-semibold mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-lg text-[#d66161] hover:text-[#b55050]"
        >
          <IoArrowBack className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 py-8"
    >
      <div className="container mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-lg text-gray-600 hover:text-[#d66161] transition-colors"
        >
          <IoArrowBack className="mr-2" /> Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Product Image Section */}
          <div className="flex flex-col">
            <div className="w-full h-96 md:h-[500px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={imageError ? "/fallback.jpg" : selectedImage}
                alt={product.title}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                      selectedImage === img
                        ? "border-[#d66161]"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setImageError(false);
                      setSelectedImage(img);
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/fallback.jpg";
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Price Section */}
            <div className="mb-6">
              <span className="text-2xl font-bold text-[#d66161]">
                ${(product.price - (product.discount || 0)).toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    Save ${product.discount.toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-[#d66161] text-white border-[#d66161]"
                        : "border-gray-300 hover:border-[#d66161]"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300 transition-colors"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-100">{quantity}</span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 transition-colors"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 mt-auto">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleFavoriteToggle}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Add to favorites"
                >
                  {favourites.includes(product.id.toString()) ? (
                    <MdFavorite className="text-red-500 text-2xl" />
                  ) : (
                    <MdFavoriteBorder className="text-gray-600 text-2xl" />
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  {product.tag || "New Arrival"}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-white border-2 border-[#d66161] text-[#d66161] rounded-md hover:bg-[#d66161] hover:text-white transition-colors font-semibold"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#d66161] text-white rounded-md hover:bg-[#b55050] transition-colors font-semibold"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
