import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'product' | 'order' | 'user'; // Add type to distinguish result types
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the current user and their role
  const { user } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await response.json();
        
        // Filter results based on user role
        const filteredResults = data.filter((result: SearchResult) => {
          // Admin can see all types of results
          if (user?.role === 'admin') return true;
          
          // Non-admin users can only see products
          return result.type === 'product';
        });
        
        setResults(filteredResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div 
              key={result.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
              <p className="text-gray-600 mb-4">{result.description}</p>
              
              {/* Optional: Add type indicator for admin */}
              {user?.role === 'admin' && (
                <div className="text-sm text-gray-500 mt-2 flex justify-between items-center">
                  <span>Type: {result.type}</span>
                  {result.type === 'order' && (
                    <button className="text-blue-500 hover:text-blue-700">
                      View Details
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;