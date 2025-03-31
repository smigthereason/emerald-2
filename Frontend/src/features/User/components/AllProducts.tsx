import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

const AllProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Product[]>('http://127.0.0.1:5000/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={product.images?.[0] || '/fallback.jpg'}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/fallback.jpg';
                                }}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
