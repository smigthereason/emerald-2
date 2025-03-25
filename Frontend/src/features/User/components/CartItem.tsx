// import { useState } from "react";

// // Define the props for the CartItem component
// interface CartItemProps {
//   item: {
//     id: string;
//     image: string;
//     title: string;
//     size: string;
//     price: string;
//   };
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   quantity: number;
// }

// const CartItem = ({ item, removeFromCart, updateQuantity }: CartItemProps) => {
//   const [quantity, setQuantity] = useState<number>(1);

//   // Helper function to parse price string to number
//   const parsePriceToNumber = (price: string): number => {
//     // Remove 'KSH' and any commas, then parse to float
//     const cleanPrice = price.replace(/[^\d.]/g, "");
//     return parseFloat(cleanPrice) || 0;
//   };

//   // Format number with thousands separator and KSH prefix
//   const formatKSH = (amount: number): string => {
//     if (isNaN(amount)) return "KSH 0";
//     return `KSH ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
//   };

//   // Handle quantity changes
//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
//     setQuantity(newQuantity);
//     updateQuantity(item.id, newQuantity);
//   };

//   const handleSizeChange = (newSize: string) => {
//     updateCartItemSize(item.id, newSize);
//   };
//   const updateCartItemSize = (id: string, newSize: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item: { id: string; }) =>
//         item.id === id ? { ...item, size: newSize } : item
//       )
//     );
//   };

//   return (
//     <div className="cart-item flex items-center space-x-8 bg-[#fff4f3] p-4 rounded-lg sm:h-[200px]">
//       <img
//         src={item.image}
//         alt={item.title}
//         className="w-44 h-44 object-contain rounded-3xl"
//       />
//       <div className="flex-1 relative right-0 sm:right-12">
//         <h3 className="font-light italic text-gray-800">{item.title}</h3>
//         <div className="flex flex-col ">
//           <p className="text-gray-500 text-sm uppercase">Size: {item.size}</p>
//           <select
//             value={item.size}
//             onChange={(e) => handleSizeChange(e.target.value)}
//             className="border rounded p-1 text-sm bg-white w-1/3 mx-auto block text-center"
//           >
//             {["S", "M", "L", "XL"].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={() => removeFromCart(item.id)}
//           className="text-red-500 text-sm mt-2 hover:transition-transform animate-pulse"
//         >
//           Remove
//         </button>
//       </div>
//       <div className="flex items-center space-x-3 absolute right-0 sm:right-40">
//         <button
//           onClick={() => handleQuantityChange(quantity - 1)}
//           disabled={quantity <= 1}
//           className="px-2 py-1 rounded-2xl hover:bg-[#D8798F] hover:text-white"
//         >
//           -
//         </button>
//         <span>{quantity}</span>
//         <button
//           onClick={() => handleQuantityChange(quantity + 1)}
//           className="px-2 py-1 rounded-2xl hover:bg-[#D8798F] hover:text-white"
//         >
//           +
//         </button>
//       </div>
//       <span className="font-medium relative right-0 sm:right-4">
//         {formatKSH(parsePriceToNumber(item.price) * quantity)}
//       </span>
//     </div>
//   );
// };

// export default CartItem;

import { useState } from "react";
import { useCart } from "../../../Shared/hooks/CartContext";

// Define the props for the CartItem component
interface CartItemProps {
  item: {
    uniqueId: string;
    id: string;
    image: string;
    title: string;
    size: string[];
    price: string;
  };
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  quantity: number;
}

const CartItem = ({
  item,
  removeFromCart,
  updateQuantity,
  quantity,
}: CartItemProps) => {
  const { updateCartItemSize } = useCart();
  const [localQuantity, setLocalQuantity] = useState<number>(quantity);

  // Helper function to parse price string to number
  const parsePriceToNumber = (price: string): number => {
    const cleanPrice = price.replace(/[^\d.]/g, "");
    return parseFloat(cleanPrice) || 0;
  };

  // Format number with thousands separator and KSH prefix
  const formatKSH = (amount: number): string => {
    if (isNaN(amount)) return "KSH 0";
    return `KSH ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
    setLocalQuantity(newQuantity);
    updateQuantity(item.uniqueId, newQuantity);
  };

  // Handle size change
  const handleSizeChange = (newSize: string) => {
    updateCartItemSize(item.uniqueId, newSize);
  };

  return (
    <div className="cart-item flex items-center space-x-8 bg-[#fff4f3] p-4 rounded-lg sm:h-[200px]">
      <img
        src={item.image}
        alt={item.title}
        className="w-44 h-44 object-contain rounded-3xl"
      />
      <div className="flex-1 relative right-0 sm:right-12">
        <h3 className="font-light italic text-gray-800">{item.title}</h3>
        
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm uppercase">
            Size: {item.selectedSize}
          </p>
          <select
            value={item.selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="border rounded p-1 text-sm bg-white w-1/3 mx-auto block text-center"
          >
            {item.size.map(
              (
                size // Use original sizes
              ) => (
                <option key={size} value={size}>
                  {size}
                </option>
              )
            )}
          </select>
        </div>
        <button
          onClick={() => removeFromCart(item.uniqueId)}
          className="text-red-500 text-sm mt-2 hover:transition-transform animate-pulse"
        >
          Remove
        </button>
      </div>
      <div className="flex items-center space-x-3 absolute right-0 sm:right-40">
        <button
          onClick={() => handleQuantityChange(localQuantity - 1)}
          disabled={localQuantity <= 1}
          className="px-2 py-1 rounded-2xl hover:bg-[#D8798F] hover:text-white"
        >
          -
        </button>
        <span>{localQuantity}</span>
        <button
          onClick={() => handleQuantityChange(localQuantity + 1)}
          className="px-2 py-1 rounded-2xl hover:bg-[#D8798F] hover:text-white"
        >
          +
        </button>
      </div>
      <span className="font-medium relative right-0 sm:right-4">
        {formatKSH(parsePriceToNumber(item.price) * localQuantity)}
      </span>
    </div>
  );
};

export default CartItem;
