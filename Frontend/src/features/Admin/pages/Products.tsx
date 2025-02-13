import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, ChevronDown } from 'lucide-react';

const mockProducts = [
  {
    id: 1,
    name: 'Premium Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    status: 'In Stock'
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 49.99,
    stock: 12,
    status: 'Low Stock'
  },
  {
    id: 3,
    name: 'Gaming Keyboard',
    category: 'Electronics',
    price: 159.99,
    stock: 0,
    status: 'Out of Stock'
  },
];

const Products = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-50 text-green-600';
      case 'Low Stock':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-red-50 text-red-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none w-full min-w-0"
          />
        </div>
        <button className="bg-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Products Table/Cards */}
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Product</th>
                <th className="text-left py-4 px-6">Category</th>
                <th className="text-left py-4 px-6">Price</th>
                <th className="text-left py-4 px-6">Stock</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{product.category}</td>
                  <td className="py-4 px-6">${product.price}</td>
                  <td className="py-4 px-6">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {mockProducts.map((product) => (
            <div key={product.id} className="border-b last:border-0 p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedRow === product.id ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>

              {expandedRow === product.id && (
                <div className="mt-4 space-y-3 pl-15">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">${product.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Stock:</span>
                    <span className="font-medium">{product.stock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <button className="w-full mt-2 text-gray-400 hover:text-gray-600 flex items-center justify-center py-2 border-t">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;