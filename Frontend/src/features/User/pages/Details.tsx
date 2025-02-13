import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../../data/products";
import { useCart } from "../../../Shared/hooks/CartContext";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { motion } from "framer-motion";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCart();
  const { favourites, toggleFavourite } = useFavourites();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Product not found!
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col sm:flex-row items-center justify-center gap-10 p-6 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="max-w-md sm:max-w-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-600 text-lg">{product.brief}</p>
        <p className="mt-4 text-2xl font-semibold text-[#D8798F]">{product.price}</p>

        {/* Wishlist & Cart Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            className="px-6 py-3 bg-[#D8798F] text-white rounded-lg shadow-md hover:bg-[#B25671] transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            onClick={() => toggleFavourite(product.id)}
            className="p-3 border rounded-full shadow-md hover:bg-gray-200 transition"
          >
            {favourites.includes(product.id) ? (
              <MdFavorite className="text-red-500 text-2xl" />
            ) : (
              <MdFavoriteBorder className="text-gray-700 text-2xl" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
