import { Plus, Search, Filter, MoreVertical } from 'lucide-react';

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
  // Add more mock products as needed
];

const Products = () => {
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <button className="bg-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
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
                      <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{product.category}</td>
                  <td className="py-4 px-6">${product.price}</td>
                  <td className="py-4 px-6">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.status === 'In Stock' ? 'bg-green-50 text-green-600' :
                      product.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
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
      </div>
    </div>
  );
};

export default Products;