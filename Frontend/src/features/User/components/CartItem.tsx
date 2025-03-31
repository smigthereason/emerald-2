// import { useState } from "react";
// import { useCart } from "../../../Shared/hooks/CartContext";

// // Define the props for the CartItem component
// interface CartItemProps {
//   item: {
//     uniqueId: string;
//     id: string;
//     image: string;
//     title: string;
//     size: string[]; // ✅ Ensure `size` is always an array
//     selectedSize?: string; // ✅ Optional, prevent undefined errors
//     price: string;
//   };
//   removeFromCart: (uniqueId: string) => void;
//   updateQuantity: (uniqueId: string, quantity: number) => void;
//   quantity: number;
// }

// const CartItem = ({
//   item,
//   removeFromCart,
//   updateQuantity,
//   quantity,
// }: CartItemProps) => {
//   const { updateCartItemSize } = useCart();
//   const [localQuantity, setLocalQuantity] = useState<number>(quantity);
//   const [selectedSize, setSelectedSize] = useState<string>(
//     item.selectedSize || (Array.isArray(item.size) && item.size.length > 0 ? item.size[0] : "")
//   );

//   const parsePriceToNumber = (price: string | number): number => {
//     if (typeof price === "number") return price; // ✅ If it's already a number, return it directly
//     if (typeof price === "string") {
//       const cleanPrice = price.replace(/[^\d.]/g, "");
//       return parseFloat(cleanPrice) || 0;
//     }
//     return 0; // ✅ Handle unexpected cases
//   };


//   // Format number with thousands separator and KSH prefix
//   const formatKSH = (amount: number): string => {
//     if (isNaN(amount)) return "KSH 0";
//     return `KSH ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
//   };

//   // Handle quantity changes
//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
//     setLocalQuantity(newQuantity);
//     updateQuantity(item.uniqueId, newQuantity);
//   };

//   // Handle size change
//   const handleSizeChange = (newSize: string) => {
//     setSelectedSize(newSize);
//     updateCartItemSize(item.uniqueId, newSize);
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

//         {/* Size Selection */}
//         <div className="flex flex-col">
//           <p className="text-gray-500 text-sm uppercase">Size: {selectedSize}</p>

//           <select
//             value={selectedSize}
//             onChange={(e) => handleSizeChange(e.target.value)}
//             className="border rounded p-1 text-sm bg-white w-1/3 mx-auto block text-center"
//           >
//             {Array.isArray(item.size) && item.size.length > 0 ? (
//               item.size.map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))
//             ) : (
//               <option value="">No Sizes Available</option> // ✅ Prevent crash
//             )}
//           </select>
//         </div>

//         {/* Remove Button */}
//         <button
//           onClick={() => removeFromCart(item.uniqueId)}
//           className="text-red-500 text-sm mt-2 hover:transition-transform animate-pulse"
//         >
//           Remove
//         </button>
//       </div>

//       {/* Quantity Selector */}
//       <div className="flex items-center space-x-3 absolute right-0 sm:right-40">
//         <button
//           onClick={() => handleQuantityChange(localQuantity - 1)}
//           disabled={localQuantity <= 1}
//           className="px-2 py-1 rounded-2xl hover:bg-[#d66161] hover:text-white"
//         >
//           -
//         </button>
//         <span>{localQuantity}</span>
//         <button
//           onClick={() => handleQuantityChange(localQuantity + 1)}
//           className="px-2 py-1 rounded-2xl hover:bg-[#d66161] hover:text-white"
//         >
//           +
//         </button>
//       </div>

//       {/* Price Display */}
//       <span className="font-medium relative right-0 sm:right-4">
//         {formatKSH(parsePriceToNumber(item.price) * localQuantity)}
//       </span>
//     </div>
//   );
// };

// export default CartItem;
import React from 'react';
import { useCart } from '../../../Shared/hooks/CartContext';
interface CartItemProps {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, size, image, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex items-center border-b py-4">
      <img
        src={image || '/fallback.jpg'}
        alt={name}
        className="w-20 h-20 object-cover mr-4"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/fallback.jpg';
        }}
      />
      <div className="flex-grow">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-600">Size: {size}</p>
        <p className="font-bold">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center border rounded-full"
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center border rounded-full"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className="ml-4 text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
