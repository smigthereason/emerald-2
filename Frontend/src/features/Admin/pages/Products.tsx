import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { uploadToCloudinary } from '../../../lib/cloudinaryUtils';

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
  images: string[];
  category_id: number;
  created_at: string;
  category_name?: string;
}

const Products = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    discount: "0",
    quantity: "1",
    tag: "",
    colors: [] as string[],
    sizes: [] as string[],
    images: [] as string[],
    category_id: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data.products || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    try {
      setIsLoading(true);
      const imageUrl = await uploadToCloudinary(file);
      setImagePreview(URL.createObjectURL(file));
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddColor = () => {
    if (tempColor && !newProduct.colors.includes(tempColor)) {
      setNewProduct((prev) => ({
        ...prev,
        colors: [...prev.colors, tempColor],
      }));
      setTempColor("");
    }
  };

  const handleRemoveColor = (color: string) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const handleAddSize = () => {
    if (tempSize && !newProduct.sizes.includes(tempSize)) {
      setNewProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, tempSize],
      }));
      setTempSize("");
    }
  };

  const handleRemoveSize = (size: string) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.title.trim()) {
      alert("Product title is required");
      return;
    }

    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!newProduct.category_id) {
      alert("Category ID is required");
      return;
    }

    try {
      setIsLoading(true);
      
      const productData = {
        title: newProduct.title.trim(),
        description: newProduct.description.trim(),
        price: parseFloat(newProduct.price),
        discount: parseFloat(newProduct.discount),
        quantity: parseInt(newProduct.quantity),
        tag: newProduct.tag.trim(),
        colors: newProduct.colors,
        sizes: newProduct.sizes,
        images: newProduct.images,
        category_id: parseInt(newProduct.category_id),
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/products",
        productData
      );

      setProducts([...products, response.data.product]);
      
      // Reset form
      setNewProduct({
        title: "",
        description: "",
        price: "",
        discount: "0",
        quantity: "1",
        tag: "",
        colors: [],
        sizes: [],
        images: [],
        category_id: "",
      });
      setImagePreview(null);
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(
        error.response?.data?.error ||
          "Failed to add product. Please check your input and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
  
    try {
      setIsLoading(true);
      
      const productData = { ...editingProduct };
      delete productData.created_at;
  
      const response = await axios.put(
        `http://127.0.0.1:5000/products/${editingProduct.id}`,
        productData
      );

      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? response.data.product : p
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

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
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Product Title*</Label>
                <Input
                  id="title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description*</Label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded bg-transparent"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price (KSH)*</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Discount */}
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, discount: e.target.value })
                  }
                  placeholder="Enter discount"
                />
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantity*</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {/* Tag */}
              <div>
                <Label htmlFor="tag">Tag*</Label>
                <Input
                  id="tag"
                  value={newProduct.tag}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, tag: e.target.value })
                  }
                  placeholder="Enter product tag"
                  required
                />
              </div>

              {/* Colors */}
              <div>
                <Label htmlFor="colors">Colors</Label>
                <div className="flex gap-2">
                  <Input
                    id="colors"
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    placeholder="Add color"
                  />
                  <Button onClick={handleAddColor}>Add</Button>
                </div>
                {newProduct.colors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProduct.colors.map((color) => (
                      <span
                        key={color}
                        className="px-2 py-1 bg-gray-100 rounded flex items-center gap-1"
                      >
                        {color}
                        <button
                          onClick={() => handleRemoveColor(color)}
                          className="text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div>
                <Label htmlFor="sizes">Sizes</Label>
                <div className="flex gap-2">
                  <Input
                    id="sizes"
                    value={tempSize}
                    onChange={(e) => setTempSize(e.target.value)}
                    placeholder="Add size"
                  />
                  <Button onClick={handleAddSize}>Add</Button>
                </div>
                {newProduct.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProduct.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-gray-100 rounded flex items-center gap-1"
                      >
                        {size}
                        <button
                          onClick={() => handleRemoveSize(size)}
                          className="text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div>
                <Label>Product Images</Label>
                <div className="flex flex-wrap gap-4">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image}
                        alt={`Product preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() =>
                          setNewProduct((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }))
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="image-upload">Add Image</Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Category ID */}
              <div>
                <Label htmlFor="category_id">Category ID*</Label>
                <Input
                  id="category_id"
                  type="number"
                  value={newProduct.category_id}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category_id: e.target.value,
                    })
                  }
                  placeholder="Enter category ID"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
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

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Title</th>
                <th className="text-left py-4 px-6">Price</th>
                <th className="text-left py-4 px-6">Quantity</th>
                <th className="text-left py-4 px-6">Category</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {product.images && product.images.length > 0 && (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">KSH {product.price.toFixed(2)}</td>
                  <td className="py-4 px-6">{product.quantity}</td>
                  <td className="py-4 px-6">{product.category_id}</td>
                  <td className="py-4 px-6">
                    <button
                      className="text-gray-400 hover:text-gray-600 mr-2"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
        >
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <textarea
                  id="edit-description"
                  className="w-full p-2 border rounded bg-transparent"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveProduct}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Products;
