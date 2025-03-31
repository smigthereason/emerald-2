import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../../Shared/hooks/FavouritesContext';
import { Product } from '../../types/Product';

const FavouritesPage: React.FC = () => {
  const { favourites, toggleFavourite } = useFavourites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products to get details for favourites
  useEffect(() => {
    const fetchProducts = async () => {
      if (favourites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<Product[]>('http://127.0.0.1:5000/products');

        // Filter products to only include favourites
        const favouriteProducts = response.data.filter(product =>
          favourites.includes(product.id.toString())
        );

        setProducts(favouriteProducts);
      } catch (err) {
        console.error('Error fetching favourite products:', err);
        setError('Failed to load your favourite products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [favourites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d66161]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">{error}</div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-6" id="fav">Your Favourites</h1>
        <p>You haven't added any products to your favourites yet.</p>
        <Link to="/" className="text-[#d66161] hover:underline mt-4 inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" id="fav">Your Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden relative">
            <button
              onClick={() => toggleFavourite(product.id.toString())}
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-1"
              aria-label="Remove from favourites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images?.[0] || product.image || '/fallback.jpg'}
                alt={product.title || product.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/fallback.jpg';
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title || product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FavouritesPage;
