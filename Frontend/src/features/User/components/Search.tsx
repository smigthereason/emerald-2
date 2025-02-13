import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative flex items-center rounded w-64 top-24 left-14 sm:left-0">
      <form onSubmit={handleSearch} className="flex w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="px-2 py-1 rounded text-gray-700 focus:outline-none bg-white w-full"
        />
        <button
          type="submit"
          aria-label="Search"
          className="px-2 hover:text-[#a88986] transition-colors duration-300 transform hover:scale-110"
        >
          <SearchIcon size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;