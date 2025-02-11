import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  // Using inline type declaration for route parameters
  const { productId } = useParams<{ productId: string }>();

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Product Detail {productId && `- ${productId}`}
      </h1>
      <p>
        Here you can display more detailed information about the product,
        including images, description, price, reviews, and more.
      </p>
    </div>
  );
};

export default ProductDetail;
