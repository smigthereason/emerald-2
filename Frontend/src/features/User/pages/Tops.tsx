import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Tops: React.FC = () => {
  // Filter products with the "tops" tag
  const topsProducts = products.filter((product) => product.tag === "tops");

  return (
    <div id="top" className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Tops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Tops;
