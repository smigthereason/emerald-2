// import { useState, useEffect } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../../../Shared/hooks/userContext";
// import useCustomScrollbar from "../../../data/useCustomScrollbar";

// import CartItem from "../components/CartItem";
// import CartSummary from "../components/CartSummary";

// interface CartItemData {
//   product_id: number;
//   quantity: number;
//   title: string;
//   image: string;
//   size: string[];
//   price: string;
//   uniqueId: string;
// }

// const Cart = () => {
//   const { authToken } = useUserContext();
//   const { containerRef, thumbRef } = useCustomScrollbar();

//   const [cart, setCart] = useState<CartItemData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [shippingCost, setShippingCost] = useState<number>(0);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (!authToken) {
//         setError("User not authenticated");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         const cartData = await response.json();
//         console.log("Cart API Response:", cartData);

//         if (response.ok) {
//           const cartWithDetails = await Promise.all(
//             cartData.map(async (cartItem: any) => {
//               const productResponse = await fetch(
//                 `http://127.0.0.1:5000/products/${cartItem.product_id}`
//               );
//               const productData = await productResponse.json();

//               // ✅ Safely handle images
//               let mainImage = "/fallback.jpg";
//               if (Array.isArray(productData.images) && productData.images.length > 0) {
//                 mainImage = productData.images[0];
//               } else if (typeof productData.images === "string") {
//                 try {
//                   const parsedImages = JSON.parse(productData.images);
//                   if (Array.isArray(parsedImages) && parsedImages.length > 0) {
//                     mainImage = parsedImages[0];
//                   }
//                 } catch (error) {
//                   console.error("Error parsing images:", error);
//                 }
//               }

//               return {
//                 product_id: cartItem.product_id,
//                 quantity: cartItem.quantity,
//                 title: productData.title,
//                 image: mainImage,
//                 price: productData.price.toString(),
//                 size: productData.sizes,
//                 uniqueId: `cart-${cartItem.product_id}`,
//               };
//             })
//           );

//           setCart(cartWithDetails);
//         } else {
//           setError("Failed to load cart items");
//         }
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//         setError("Error fetching cart data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [authToken]);

//   // ✅ Function to remove item from cart
//   const removeFromCart = async (uniqueId: string, productId: number) => {
//     if (!authToken) {
//       console.error("User not authenticated");
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/cart/${productId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (response.ok) {
//         // ✅ Remove item from state
//         setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
//       } else {
//         console.error("Failed to remove item from cart");
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const updateQuantity = (uniqueId: string, newQuantity: number) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [uniqueId]: newQuantity,
//     }));
//   };

//   const subtotal = cart.reduce(
//     (total, item) =>
//       total + parseFloat(item.price) * (quantities[item.uniqueId] || 1),
//     0
//   );

//   const total = subtotal + shippingCost;

//   const handleShippingCostChange = (cost: number) => {
//     setShippingCost(cost);
//   };

//   return (
//     <div className="cart min-h-screen bg-white rounded-lg shadow-lg">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="mb-8">
//           <Link to="/" className="flex items-center text-pink-400">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Continue shopping
//           </Link>
//         </div>

//         {loading ? (
//           <p>Loading cart...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : cart.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-2xl font-semibold text-gray-700">
//                   Shopping cart
//                 </h1>
//                 <span className="text-pink-400">{cart.length} items</span>
//               </div>

//               <div className="relative">
//                 <div
//                   ref={containerRef}
//                   className="custom-scrollbar-container space-y-6 overflow-hidden absolute inset-0 min-h-[calc(100vh-10px)]"
//                 >
//                   {cart.map((item) => (
//                     <CartItem
//                       key={item.uniqueId}
//                       item={item}
//                       updateQuantity={updateQuantity}
//                       removeFromCart={() => removeFromCart(item.uniqueId, item.product_id)} // ✅ Pass removeFromCart
//                       quantity={quantities[item.uniqueId] || 1}
//                     />
//                   ))}
//                 </div>
//                 <div className="custom-scrollbar-track">
//                   <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-1 h-full">
//               <CartSummary
//                 cart={cart}
//                 subtotal={subtotal}
//                 shippingCost={shippingCost}
//                 total={total}
//                 onShippingCostChange={handleShippingCostChange}
//               />
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../Shared/hooks/userContext";
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
  const { authToken } = useUserContext();
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
