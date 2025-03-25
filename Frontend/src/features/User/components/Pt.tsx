import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  tag: string;
  colors: string[];
  sizes: string[];
  images: string[] | null;
  category_id: number;
  created_at: string;
}

interface ProductResponse {
  products: Product[];
  total_products: number;
  page: number;
  per_page: number;
  total_pages: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse>('http://127.0.0.1:5000/products');

        // Log the entire response to understand its structure
        console.log('Full API Response:', response.data);

        // Ensure we're setting the products array correctly
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error details:', err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Add a check to ensure products is an array before mapping
  if (!Array.isArray(products)) {
    return <div>Invalid product data</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Discount: {product.discount * 100}%</p>
              <p>Quantity: {product.quantity}</p>
              <p>Tag: {product.tag}</p>
              <p>Category ID: {product.category_id}</p>
              <p>Created At: {new Date(product.created_at).toLocaleDateString()}</p>

              {product.images && (
                <div>
                  <p>Images:</p>
                  <div className="flex gap-2">
                    {(typeof product.images === 'string' ? JSON.parse(product.images) : product.images).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => e.currentTarget.src = '/fallback.jpg'}
                      />
                    ))}
                  </div>
                </div>
              )}



              <div>
                <p>Colors: {typeof product.colors === 'string' ? JSON.parse(product.colors).join(', ') : product.colors.join(', ')}</p>
                <p>Sizes: {typeof product.sizes === 'string' ? JSON.parse(product.sizes).join(', ') : product.sizes.join(', ')}</p>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;