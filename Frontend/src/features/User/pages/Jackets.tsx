import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Jackets: React.FC = () => {
  // Filter products with the "jacket" tag
  const jacketsProducts = products.filter(
    (product) => product.tag === "jacket"
  );

  return (
    <div id="jacket" className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Jackets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {jacketsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Jackets;
