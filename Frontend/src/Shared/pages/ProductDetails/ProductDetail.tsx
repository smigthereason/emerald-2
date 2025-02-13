import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  brief: string;
  price: string;
  image: string;
  discount?: number;
  stock?: number;
}

// Mock function to fetch product data based on id
const fetchProductById = (id: string): Product => {
  // In a real application, fetch this data from an API
  return {
    id,
    title: "Sample Product",
    brief: "This is a brief description of the product.",
    price: "$99.99",
    image: "https://via.placeholder.com/400",
    discount: 10,
    stock: 50,
  };
};

interface ProductDetailsProps {
  isAdmin?: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ isAdmin = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = fetchProductById(id!);

  const [discount, setDiscount] = useState<number>(product.discount || 0);
  const [stock, setStock] = useState<number>(product.stock || 0);

  const handleDelete = () => {
    // Implement deletion logic (e.g., API call)
    console.log("Deleting product with id:", product.id);
    // After deletion, navigate to an inventory or products list page
    navigate("/admin/inventory");
  };

  const handleUpdateDiscount = () => {
    // Implement discount update logic (e.g., API call)
    console.log(
      `Updating discount to ${discount}% for product with id:`,
      product.id
    );
  };

  const handleUpdateStock = () => {
    // Implement stock update logic (e.g., API call)
    console.log(`Updating stock to ${stock} for product with id:`, product.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full sm:w-1/2 object-contain rounded-lg"
        />
        <div className="sm:ml-8 mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.brief}</p>
          <p className="text-2xl font-semibold mb-4">Price: {product.price}</p>
          {product.discount && (
            <p className="text-lg text-green-600 mb-4">
              Current Discount: {product.discount}%
            </p>
          )}
          <p className="text-lg mb-4">
            Stock Available: {product.stock !== undefined ? product.stock : 0}
          </p>

          {/* Render admin controls if isAdmin is true, else render user control */}
          {isAdmin ? (
            <div className="space-y-6">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Delete Product
              </button>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  placeholder="Set Discount %"
                  className="border p-2 rounded"
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  onClick={handleUpdateDiscount}
                >
                  Update Discount
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Update Stock"
                  className="border p-2 rounded"
                />
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  onClick={handleUpdateStock}
                >
                  Update Stock
                </button>
              </div>
            </div>
          ) : (
            <button className="px-6 py-2 bg-[#D8798F] text-white rounded-full hover:bg-[#c06374] transition">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
