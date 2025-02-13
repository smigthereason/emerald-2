import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Skirts: React.FC = () => {
  // Filter products with the "skirts" tag
  const skirtsProducts = products.filter((product) => product.tag === "skirts");

  return (
    <div id="skirt" className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Skirts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {skirtsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Skirts;
