import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Dresses: React.FC = () => {
  // Filter products with the "dresses" tag
  const dressesProducts = products.filter(
    (product) => product.tag === "dresses"
  );
  const navigate = useNavigate();

  return (
    <div id="dress" className="py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          className="text-lg flex items-center text-black hover:text-[#617583] transition-colors"
          onClick={() => navigate(-1)}
          type="button"
        >
          <IoArrowBack className="mr-2" /> Back
        </button>
        <h1 className="text-3xl font-bold flex-1 text-center">Dresses</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dressesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dresses;
