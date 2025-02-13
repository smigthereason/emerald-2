import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Shoes: React.FC = () => {
  // Filter products with the "shoe" tag
  const shoesProducts = products.filter((product) => product.tag === "shoe");

  return (
    <div id="shoe" className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Shoes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {shoesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shoes;
