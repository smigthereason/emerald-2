// import { useState } from 'react';
// import { Plus, Search, Filter, MoreVertical, ChevronDown } from 'lucide-react';

// const mockProducts = [
//   {
//     id: 1,
//     name: 'Premium Headphones',
//     category: 'Electronics',
//     price: 199.99,
//     stock: 45,
//     status: 'In Stock'
//   },
//   {
//     id: 2,
//     name: 'Wireless Mouse',
//     category: 'Electronics',
//     price: 49.99,
//     stock: 12,
//     status: 'Low Stock'
//   },
//   {
//     id: 3,
//     name: 'Gaming Keyboard',
//     category: 'Electronics',
//     price: 159.99,
//     stock: 0,
//     status: 'Out of Stock'
//   },
// ];

// const Products = () => {
//   const [expandedRow, setExpandedRow] = useState<number | null>(null);

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case 'In Stock':
//         return 'bg-green-50 text-green-600';
//       case 'Low Stock':
//         return 'bg-yellow-50 text-yellow-600';
//       default:
//         return 'bg-red-50 text-red-600';
//     }
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 w-full sm:w-auto">
//           <Plus className="w-4 h-4" />
//           Add Product
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//         <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
//           <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="flex-1 bg-transparent outline-none w-full min-w-0"
//           />
//         </div>
//         <button className="bg-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
//           <Filter className="w-4 h-4" />
//           Filters
//         </button>
//       </div>

//       {/* Products Table/Cards */}
//       <div className="bg-white rounded-2xl shadow-sm">
//         {/* Desktop Table View */}
//         <div className="hidden md:block overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-4 px-6">Product</th>
//                 <th className="text-left py-4 px-6">Category</th>
//                 <th className="text-left py-4 px-6">Price</th>
//                 <th className="text-left py-4 px-6">Stock</th>
//                 <th className="text-left py-4 px-6">Status</th>
//                 <th className="text-left py-4 px-6"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {mockProducts.map((product) => (
//                 <tr key={product.id} className="border-b last:border-0">
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
//                       <span className="font-medium">{product.name}</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6 text-gray-500">{product.category}</td>
//                   <td className="py-4 px-6">${product.price}</td>
//                   <td className="py-4 px-6">{product.stock}</td>
//                   <td className="py-4 px-6">
//                     <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(product.status)}`}>
//                       {product.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <button className="text-gray-400 hover:text-gray-600">
//                       <MoreVertical className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="md:hidden">
//           {mockProducts.map((product) => (
//             <div key={product.id} className="border-b last:border-0 p-4">
//               <div 
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
//                   <div>
//                     <h3 className="font-medium">{product.name}</h3>
//                     <p className="text-sm text-gray-500">{product.category}</p>
//                   </div>
//                 </div>
//                 <ChevronDown 
//                   className={`w-5 h-5 text-gray-400 transition-transform ${
//                     expandedRow === product.id ? 'transform rotate-180' : ''
//                   }`} 
//                 />
//               </div>

//               {expandedRow === product.id && (
//                 <div className="mt-4 space-y-3 pl-15">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Price:</span>
//                     <span className="font-medium">${product.price}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Stock:</span>
//                     <span className="font-medium">{product.stock}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Status:</span>
//                     <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(product.status)}`}>
//                       {product.status}
//                     </span>
//                   </div>
//                   <button className="w-full mt-2 text-gray-400 hover:text-gray-600 flex items-center justify-center py-2 border-t">
//                     <MoreVertical className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, ChevronDown, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/Label';

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
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState<any>(null);

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

  const handleEditProduct = (product: any) => {
    setEditingProduct({...product});
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
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
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
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
                    <Dialog open={editingProduct?.id === product.id} onOpenChange={() => setEditingProduct(null)}>
                      <DialogTrigger asChild>
                        <button 
                          className="text-gray-400 hover:text-gray-600 mr-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name">Product Name</Label>
                              <Input 
                                id="name"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Input 
                                id="category"
                                value={editingProduct.category}
                                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <Input 
                                id="price"
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="stock">Stock</Label>
                              <Input 
                                id="stock"
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="status">Status</Label>
                              <select 
                                id="status"
                                className="w-full p-2 border rounded"
                                value={editingProduct.status}
                                onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value})}
                              >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                              </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                              <Button onClick={handleSaveProduct}>Save Changes</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <button 
                      className="text-red-400 hover:text-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {products.map((product) => (
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
                  <div className="flex justify-center items-center space-x-4 border-t pt-2">
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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