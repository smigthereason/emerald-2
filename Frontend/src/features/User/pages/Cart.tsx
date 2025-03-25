// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useCart } from "../../../Shared/hooks/CartContext";
// import useCustomScrollbar from "../../../data/useCustomScrollbar";

// import CartItem from "../components/CartItem";
// import CartSummary from "../components/CartSummary";

// // Define the structure of a cart item
// interface CartItem {
//   id: string;
//   image: string;
//   title: string;
//   brief: string;
//   price: string;
// }

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();
//   const { containerRef, thumbRef } = useCustomScrollbar();
//   const [shippingCost] = useState<number>(0);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

//   // Function to update the size of a cart item
//   const updateCartItemSize = (itemId: string, newSize: string) => {
//     console.log(`Updated item ${itemId} to size ${newSize}`);
//     // Add logic here to handle size updates if needed
//   };

//   // Helper function to parse price string to number
//   const parsePriceToNumber = (price: string): number => {
//     const cleanPrice = price.replace(/[^\d.]/g, "");
//     return parseFloat(cleanPrice) || 0;
//   };

//   // Update the quantity of a specific item in the cart
//   const updateQuantity = (itemId: string, newQuantity: number) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [itemId]: newQuantity,
//     }));
//   };

//   // Calculate subtotal based on cart items and quantities
//   const subtotal = cart.reduce(
//     (total, item) =>
//       total + parsePriceToNumber(item.price) * (quantities[item.id] || 1),
//     0
//   );

//   // Calculate total including shipping cost
//   const total = subtotal + shippingCost;

//   return (
//     <div className="cart min-h-screen bg-white rounded-lg shadow-lg">
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="mb-8">
//           <Link to="/" className="flex items-center text-pink-400">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Continue shopping
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items Section */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-2xl font-semibold text-gray-700">
//                 Shopping cart
//               </h1>
//               <span className="text-pink-400">{cart.length} items</span>
//             </div>

//             <div className="relative">
//               <div
//                 ref={containerRef}
//                 className="custom-scrollbar-container space-y-6 overflow-hidden absolute inset-0 min-h-[calc(100vh-10px)]"
//               >
//                 {cart.map((item) => (
//              <CartItem
//              key={`${item.id}-${item.size}`}
//              item={item}
//              removeFromCart={removeFromCart}
//              updateQuantity={updateQuantity}
//              updateCartItemSize={updateCartItemSize} // Pass the new function
//              quantity={quantities[item.id] || 1}
//            />
           
//                 ))}
//               </div>
//               <div className="custom-scrollbar-track">
//                 <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
//               </div>
//             </div>
//           </div>

//           {/* Cart Summary Section */}
//           <div className="lg:col-span-1 h-full">
//             <CartSummary
//               cart={cart}
//               subtotal={subtotal}
//               shippingCost={shippingCost}
//               total={total}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../Shared/hooks/CartContext";
import useCustomScrollbar from "../../../data/useCustomScrollbar";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { containerRef, thumbRef } = useCustomScrollbar();
  
  // Remove the hardcoded shipping cost and use state to manage it
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Helper function to parse price string to number
  const parsePriceToNumber = (price: string): number => {
    const cleanPrice = price.replace(/[^\d.]/g, "");
    return parseFloat(cleanPrice) || 0;
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = (uniqueId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [uniqueId]: newQuantity,
    }));
  };

  // Calculate subtotal based on cart items and quantities
  const subtotal = cart.reduce(
    (total, item) =>
      total + parsePriceToNumber(item.price) * (quantities[item.uniqueId] || 1),
    0
  );

  // Calculate total including shipping cost
  const total = subtotal + shippingCost;

  // Function to update shipping cost from DeliveryLocation
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
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
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    quantity={quantities[item.uniqueId] || 1}
                  />
                ))}
              </div>
              <div className="custom-scrollbar-track">
                <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
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
      </div>
    </div>
  );
};

export default Cart;