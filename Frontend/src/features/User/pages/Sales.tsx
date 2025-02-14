import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { useCart } from "../../../Shared/hooks/CartContext";
import { Product, products } from "../../../data/products"; // Import products



// Randomly generate discount values
const discountedProducts: Product[] = products.map((product) => ({
  ...product,
  discount: [20, 30, 50][Math.floor(Math.random() * 3)], // Random discount
}));

const SalesClearance: React.FC = () => {
  const { toggleFavourite } = useFavourites();
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const { addToCart } = useCart();

  // Filter sale items based on discount selection
  const filteredProducts = selectedDiscount
    ? discountedProducts.filter(
        (product) => product.discount >= selectedDiscount
      )
    : discountedProducts;

 
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, productTitle: string) => {
      e.stopPropagation();
      addToCart(products.find((p) => p.title === productTitle)!);
      alert(`${productTitle} added to cart!`);
    };
  

  // Updated to use the product's string ID directly
  const handleAddToWishlist = (productId: string, productTitle: string) => {
    toggleFavourite(productId);
    alert(`${productTitle} added to favourites!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <img
            className="w-full h-full object-cover backdrop-filter backdrop-blur-lg"
            src="src/assets/bg-images/sale2.jpg"
            alt="sale2"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold uppercase">🔥 Clearance Sale 🔥</h1>
          <p className="mt-4 text-lg">Up to 70% Off - Limited Stock!</p>
          <Link to="/">
            <button className="mt-6 px-6 py-3 bg-white text-[#D8798F] font-semibold rounded-full shadow-md hover:bg-[#B25671] hover:text-white transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Discount Filters */}
      <div className="py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Filter by Discount:</h2>
        <div className="flex justify-center gap-4">
          {[20, 30, 50].map((discount) => (
            <button
              key={discount}
              onClick={() => setSelectedDiscount(discount)}
              className={`px-5 py-2 rounded-full border-2 ${
                selectedDiscount === discount
                  ? "bg-[#D8798F] text-white border-[#B25671]"
                  : "border-gray-400 text-gray-700 hover:bg-gray-200"
              } transition`}
            >
              {discount}% Off
            </button>
          ))}
          <button
            onClick={() => setSelectedDiscount(null)}
            className="px-5 py-2 rounded-full border-2 border-gray-400 text-gray-700 hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Sale Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-16">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="box bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-56 sm:w-full h-[350px] sm:h-[400px] object-contain mx-auto mt-2 sm:mt-8 rounded-lg"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-500 mt-4 h-40">{product.brief}</p>
                <p className="mt-2 text-gray-500">
                  <span className="text-red-500 font-bold">
                    Ksh
                    {(
                      parseFloat(product.price.replace("Ksh", "")) *
                      (1 - product.discount / 100)
                    ).toFixed(2)}
                  </span>{" "}
                  <span className="line-through text-gray-400">
                    {product.price}
                  </span>
                </p>
                <span className="mt-2 inline-block bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  {product.discount}% OFF
                </span>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-[#D8798F] text-white rounded-full text-sm hover:bg-[#B25671] transition"
                    onClick={(e) => handleAddToCart(e, product.title)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 border border-[#D8798F] text-[#D8798F] rounded-full text-sm hover:bg-[#D8798F] hover:text-white transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product.id, product.title);
                    }}
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full col-span-3">
            No items found for this discount.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesClearance;
