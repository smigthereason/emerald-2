

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
//               let mainImage = "/fallback.jpg"; // Default fallback image
          
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
//                 image: mainImage, // ✅ Ensure image is assigned correctly
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




import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../Shared/hooks/userContext";
import useCustomScrollbar from "../../../data/useCustomScrollbar";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

interface CartItemData {
  product_id: number;
  quantity: number;
  title: string;
  image: string;
  size: string[];
  price: string;
  uniqueId: string;
}

const Cart = () => {
  const { authToken } = useUserContext();
  const { containerRef, thumbRef } = useCustomScrollbar();

  const [cart, setCart] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!authToken) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const cartData = await response.json();
        console.log("Cart API Response:", cartData);

        if (response.ok) {
          const cartWithDetails = await Promise.all(
            cartData.map(async (cartItem: any) => {
              const productResponse = await fetch(
                `http://127.0.0.1:5000/products/${cartItem.product_id}`
              );
              const productData = await productResponse.json();

              // ✅ Safely handle images
              let mainImage = "/fallback.jpg";
              if (Array.isArray(productData.images) && productData.images.length > 0) {
                mainImage = productData.images[0];
              } else if (typeof productData.images === "string") {
                try {
                  const parsedImages = JSON.parse(productData.images);
                  if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                    mainImage = parsedImages[0];
                  }
                } catch (error) {
                  console.error("Error parsing images:", error);
                }
              }

              return {
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                title: productData.title,
                image: mainImage,
                price: productData.price.toString(),
                size: productData.sizes,
                uniqueId: `cart-${cartItem.product_id}`,
              };
            })
          );

          setCart(cartWithDetails);
        } else {
          setError("Failed to load cart items");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [authToken]);

  // ✅ Function to remove item from cart
  const removeFromCart = async (uniqueId: string, productId: number) => {
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // ✅ Remove item from state
        setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = (uniqueId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [uniqueId]: newQuantity,
    }));
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price) * (quantities[item.uniqueId] || 1),
    0
  );

  const total = subtotal + shippingCost;

  const handleShippingCostChange = (cost: number) => {
    setShippingCost(cost);
  };

  return (
    <div className="cart min-h-screen bg-white rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-pink-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue shopping
          </Link>
        </div>

        {loading ? (
          <p>Loading cart...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-700">
                  Shopping cart
                </h1>
                <span className="text-pink-400">{cart.length} items</span>
              </div>

              <div className="relative">
                <div
                  ref={containerRef}
                  className="custom-scrollbar-container space-y-6 overflow-hidden absolute inset-0 min-h-[calc(100vh-10px)]"
                >
                  {cart.map((item) => (
                    <CartItem
                      key={item.uniqueId}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={() => removeFromCart(item.uniqueId, item.product_id)} // ✅ Pass removeFromCart
                      quantity={quantities[item.uniqueId] || 1}
                    />
                  ))}
                </div>
                <div className="custom-scrollbar-track">
                  <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 h-full">
              <CartSummary
                cart={cart}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
                onShippingCostChange={handleShippingCostChange}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
