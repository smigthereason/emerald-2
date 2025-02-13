import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Dresses: React.FC = () => {
  // Filter products with the "dresses" tag
  const dressesProducts = products.filter((product) => product.tag === "dresses");

  return (
    <div id="dress"className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Dresses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dressesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dresses;
