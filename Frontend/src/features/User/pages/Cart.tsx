import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
// import { useUserContext } from "../../../Shared/hooks/userContext";
import { useAuth } from "../../../Shared/hooks/AuthContext";
import { useCart } from "../../../Shared/hooks/CartContext";
import axios from "axios";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

interface CartItemData {
  product_id: number;
  quantity: number;
  title: string;
  image: string;
  size: string;
  price: number;
  uniqueId: string;
}

const Cart = () => {
  // const { authToken } = useUserContext();
  const { user } = useAuth();
  const authToken = localStorage.getItem("token");
  const {
    cart: localCart,
    removeFromCart: removeFromLocalCart,
    updateCartItemQuantity,
  } = useCart();
  const [backendCart, setBackendCart] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0);

  // Fetch cart from backend when authToken changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Transform backend response to match our frontend structure
        const formattedCart = response.data.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          title: item.title || `Product ${item.product_id}`,
          image: item.image || "/fallback.jpg",
          size: item.size || "One Size",
          price: item.price || 0,
          uniqueId: `backend-${item.product_id}-${item.size || ""}`,
        }));

        setBackendCart(formattedCart);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [authToken]);

  // Merge backend and local cart items
  const mergedCart = useMemo(() => {
    // Create a map of all items with uniqueId as key
    const cartMap = new Map<string, CartItemData>();

    // Add backend items first
    backendCart.forEach((item) => {
      cartMap.set(item.uniqueId, item);
    });

    // Add or update with local items
    localCart.forEach((item) => {
      const uniqueId = item.uniqueId;
      const existingItem = cartMap.get(uniqueId);

      if (existingItem) {
        // Use the higher quantity between backend and local
        cartMap.set(uniqueId, {
          ...existingItem,
          quantity: Math.max(existingItem.quantity, item.quantity),
        });
      } else {
        cartMap.set(uniqueId, {
          product_id: item.id,
          quantity: item.quantity,
          title: item.title,
          image: item.image,
          size: item.size,
          price: item.price,
          uniqueId: item.uniqueId,
        });
      }
    });

    return Array.from(cartMap.values());
  }, [backendCart, localCart]);

  // Handle item removal
  // Handle item removal - updated version
  const handleRemoveItem = async (uniqueId: string, productId: number) => {
    try {
      if (authToken) {
        await axios.delete(`http://127.0.0.1:5000/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
      removeFromLocalCart(uniqueId);
      setBackendCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };


  // Handle quantity updates
  const handleQuantityUpdate = async (
    uniqueId: string,
    productId: number,
    newQuantity: number
  ) => {
    try {
      // Update local state immediately
      updateCartItemQuantity(uniqueId, newQuantity);

      // Sync with backend if authenticated
      if (authToken) {
        await axios.put(
          `http://127.0.0.1:5000/cart/${productId}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  // Calculate totals
  const subtotal = mergedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d66161]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error} -{" "}
        <button
          onClick={() => window.location.reload()}
          className="text-[#d66161] underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center text-[#d66161] hover:text-[#b55050]"
        >
          <span className="mr-2">←</span> Continue Shopping
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Your Cart ({mergedCart.length})
      </h1>

      {mergedCart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-[#d66161] text-white rounded-md hover:bg-[#b55050] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {mergedCart.map((item) => (
              <CartItem
                key={item.uniqueId}
                item={{
                  uniqueId: item.uniqueId,
                  id: item.product_id.toString(),
                  image: item.image,
                  title: item.title,
                  size: Array.isArray(item.size) ? item.size : [item.size],
                  selectedSize: item.size,
                  price: item.price,
                }}
                quantity={item.quantity}
                onQuantityChange={(newQty) =>
                  handleQuantityUpdate(item.uniqueId, item.product_id, newQty)
                }
                onRemove={() => handleRemoveItem(item.uniqueId, item.product_id)}
              />
            ))}
          </div>

          <div className="md:col-span-1">
            <CartSummary
              subtotal={subtotal}
              total={total}
              shippingCost={shippingCost}
              onShippingCostChange={setShippingCost}
              itemCount={mergedCart.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
