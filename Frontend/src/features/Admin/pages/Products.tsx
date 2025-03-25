import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  ImagePlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/Label";

const mockProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    category: "Tops",
    price: 199.99,
    stock: 45,
    status: "In Stock",
    image: "", // Added image field
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Skirts",
    price: 49.99,
    stock: 12,
    status: "Low Stock",
    image: "", // Added image field
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    category: "Dresses",
    price: 159.99,
    stock: 0,
    status: "Out of Stock",
    image: "", // Added image field
  },
];

const PRODUCT_CATEGORIES = [
  "Tops",
  "Skirts",
  "Dresses",
  "Jackets",
  "Shoes",
  "Pants",
];

const Products = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [products, setProducts] = useState(mockProducts);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Tops",
    price: "",
    stock: "",
    status: "In Stock",
    image: "", // Added image field
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-50 text-green-600";
      case "Low Stock":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-red-50 text-red-600";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }

      if (file.size > maxSize) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Create a file reader to generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    // Validate input
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all fields");
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };

    setProducts([...products, productToAdd]);

    // Reset form and close modal
    setNewProduct({
      name: "",
      category: "Tops",
      price: "",
      stock: "",
      status: "In Stock",
      image: "",
    });
    setImagePreview(null);
    setIsAddModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <button
              className="bg-[#d48383] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#d66161] w-full sm:w-auto"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div className="flex flex-col items-center">
                <Label>Product Image</Label>
                <div className="relative w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center mt-2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <ImagePlus className="w-12 h-12 mx-auto mb-2" />
                      <p>Upload Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Existing input fields */}
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full p-2 border rounded bg-transparent "
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  {PRODUCT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="price">Price (KSH)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Enter price in KSH"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full p-2 border rounded bg-transparent hover:bg-"
                  value={newProduct.status}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, status: e.target.value })
                  }
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                  <td className="py-4 px-6 text-gray-500">
                    {product.category}
                  </td>
                  <td className="py-4 px-6">${product.price}</td>
                  <td className="py-4 px-6">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Dialog
                      open={editingProduct?.id === product.id}
                      onOpenChange={(isOpen) =>
                        !isOpen && setEditingProduct(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <button
                          className="text-gray-400 hover:text-gray-600 mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(product);
                          }}
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
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                value={editingProduct.category}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    category: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <Input
                                id="price"
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    price: parseFloat(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="stock">Stock</Label>
                              <Input
                                id="stock"
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    stock: parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="status">Status</Label>
                              <select
                                id="status"
                                className="w-full p-2 border rounded"
                                value={editingProduct.status}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    status: e.target.value,
                                  })
                                }
                              >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">
                                  Out of Stock
                                </option>
                              </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setEditingProduct(null)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleSaveProduct}>
                                Save Changes
                              </Button>
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
                onClick={() =>
                  setExpandedRow(expandedRow === product.id ? null : product.id)
                }
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
                    expandedRow === product.id ? "transform rotate-180" : ""
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                        product.status
                      )}`}
                    >
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
