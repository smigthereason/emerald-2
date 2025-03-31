
// import React from 'react';
// import { useCart } from '../../../Shared/hooks/CartContext';
// interface CartItemProps {
//   id: string;
//   name: string;
//   price: number;
//   size: string;
//   image: string;
//   quantity: number;
// }

// const CartItem: React.FC<CartItemProps> = ({ id, name, price, size, image, quantity }) => {
//   const { updateQuantity, removeFromCart } = useCart();

//   const handleIncrease = () => {
//     updateQuantity(id, quantity + 1);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       updateQuantity(id, quantity - 1);
//     } else {
//       removeFromCart(id);
//     }
//   };

//   return (
//     <div className="flex items-center border-b py-4">
//       <img
//         src={image || '/fallback.jpg'}
//         alt={name}
//         className="w-20 h-20 object-cover mr-4"
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = '/fallback.jpg';
//         }}
//       />
//       <div className="flex-grow">
//         <h3 className="font-medium">{name}</h3>
//         <p className="text-sm text-gray-600">Size: {size}</p>
//         <p className="font-bold">${price.toFixed(2)}</p>
//       </div>
//       <div className="flex items-center">
//         <button
//           onClick={handleDecrease}
//           className="w-8 h-8 flex items-center justify-center border rounded-full"
//         >
//           -
//         </button>
//         <span className="mx-2">{quantity}</span>
//         <button
//           onClick={handleIncrease}
//           className="w-8 h-8 flex items-center justify-center border rounded-full"
//         >
//           +
//         </button>
//       </div>
//       <button
//         onClick={() => removeFromCart(id)}
//         className="ml-4 text-red-500"
//       >
//         Remove
//       </button>
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

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  name, 
  price, 
  size, 
  image, 
  quantity 
}) => {
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

  // Format price safely
  const formatPrice = (value: number): string => {
    if (value === undefined || isNaN(value)) {
      return "$0.00";
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="flex items-center border-b py-4">
      <img
        src={image || '/fallback.jpg'}
        alt={name || 'Product'}
        className="w-20 h-20 object-cover mr-4"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/fallback.jpg';
        }}
      />
      <div className="flex-grow">
        <h3 className="font-medium">{name || 'Product'}</h3>
        <p className="text-sm text-gray-600">Size: {size || 'One Size'}</p>
        <p className="font-bold">{formatPrice(price)}</p>
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