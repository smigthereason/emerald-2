import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { useNavigate } from "react-router-dom";

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

interface ProductResponse {
  products: Product[];
  total_products: number;
  page: number;
  per_page: number;
  total_pages: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const { favourites, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse>('http://127.0.0.1:5000/products');
        const productsData = response.data.products || [];
        
        // Properly format the products to match the expected structure
        const formattedProducts = productsData.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description || 'No description available',
          price: p.price,
          discount: p.discount || 0,
          quantity: p.quantity || 1,
          tag: p.tag || '',
          colors: Array.isArray(p.colors) ? p.colors : 
                (typeof p.colors === 'string' ? JSON.parse(p.colors) : []),
          sizes: Array.isArray(p.sizes) ? p.sizes : 
               (typeof p.sizes === 'string' ? JSON.parse(p.sizes) : []),
          images: Array.isArray(p.images) ? p.images : 
                (typeof p.images === 'string' ? JSON.parse(p.images) : []),
          category_id: p.category_id || 1,
          created_at: p.created_at || new Date().toISOString()
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Create a memoized shuffled copy so it doesn't change on every render
  const shuffledProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5);
  }, [products]);

  const visibleProducts = shuffledProducts.slice(0, visibleCount);

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const seeLessProducts = () => {
    setVisibleCount(prevCount => Math.max(prevCount - 6, 6));
    window.scrollTo({
      top: 650,
      behavior: "smooth",
    });
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 50;

    const handleCardClick = () => {
      navigate(`/product-detail/${product.id}`);
    };

    const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      toggleFavourite(product.id.toString());
    };

    const toggleReadMore = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    };

    const getMainImage = () => {
      try {
        // Ensure we always have at least one image
        if (product.images && product.images.length > 0) {
          return product.images[0];
        }
        return '/fallback.jpg';
      } catch {
        return '/fallback.jpg';
      }
    };

    const mainImage = getMainImage();

    return (
      <motion.div
        onClick={handleCardClick}
        className="box bg-white overflow-hidden border h-[650px] sm:h-auto rounded-lg shadow-lg cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Product Image */}
        <div className="relative group top-0">
          <img
            className="w-56 sm:w-full h-[25 0px] sm:h-[200px] object-contain mx-auto mt-2 sm:mt-8 rounded-lg"
            src={mainImage}
            alt={product.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/fallback.jpg';
            }}
          />

          {/* Hover Icons for Large Screens */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button 
                onClick={handleFavouriteClick}
                className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
              >
                {favourites.includes(product.id.toString()) ? (
                  <MdFavorite className="text-red-500 text-3xl" />
                ) : (
                  <MdFavoriteBorder className="text-gray-700 text-3xl" />
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
          <button 
            onClick={handleFavouriteClick}
            className="p-1 bg-white rounded-full"
          >
            {favourites.includes(product.id.toString()) ? (
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
              ? product.description
              : `${product.description.slice(0, maxLength)}...`}
            {product.description.length > maxLength && (
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
              Ksh{product.price.toFixed(2)}
            
            </span>
            <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-16">
              <button
                className="px-4 py-2 border transition-transform duration-300 hover:-translate-y-1 border-[#d66161] text-[#d66161] rounded-full text-sm hover:bg-[#d66161] hover:text-white"
                onClick={handleCardClick}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d66161]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error} - Please try again later
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Featured Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center mt-8 space-y-4">
        {visibleCount < shuffledProducts.length && (
          <button
            onClick={loadMoreProducts}
            className="bg-white transition-transform duration-300 hover:-translate-y-1 text-[#d66161] px-6 py-2 rounded-full hover:bg-[#d66161] hover:text-white border border-[#d66161]"
          >
            Load More
          </button>
        )}
        {visibleCount > 6 && (
          <button
            onClick={seeLessProducts}
            className="bg-white transition-transform duration-300 hover:-translate-y-1 text-[#d66161] px-6 py-2 rounded-full hover:bg-[#d66161] hover:text-white border border-[#d66161]"
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;