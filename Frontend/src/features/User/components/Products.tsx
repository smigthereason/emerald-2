import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../../../data/products"; 

const Products: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const visibleProducts = products.slice(0, visibleCount);

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const seeLessProducts = () => {
    setVisibleCount(6);
    window.scrollTo({
      top: 650,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-2xl font-light mb-4">
        <span className="text-black font-bold">featured </span>items
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 border-black w-16"></div>
      </div>
      <div className="grid grid-row-1 gap-8 mt-8 sm:grid-cols-3">
        <AnimatePresence>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
      {visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            className="bg-white text-[#D8798F] px-6 py-2 rounded-full hover:bg-[#D8798F] hover:text-white border border-[#D8798F]"
          >
            Load More
          </button>
        </div>
      )}
      {visibleCount > 6 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={seeLessProducts}
            className="bg-white text-[#D8798F] px-6 py-2 rounded-full hover:bg-[#D8798F] hover:text-white border border-[#D8798F]"

          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;