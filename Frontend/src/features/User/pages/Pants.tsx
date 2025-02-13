import React from "react";
import { products } from "../../../data/products";
import ProductCard from "../components/ProductCard";

const Pants: React.FC = () => {
  // Filter products with the "pant" tag
  const pantsProducts = products.filter((product) => product.tag === "pant");

  return (
    <div id="pant" className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Pants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {pantsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Pants;
