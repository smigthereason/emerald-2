import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  // Add more fields as needed based on your API response
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

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
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p className="text-gray-600 mt-2">{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;