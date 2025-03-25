// import React, { createContext, useContext, useState } from "react";
// import { Product } from "../../data/products";

// interface CartContextType {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeFromCart = (id: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const updateCartItemSize = (id: string, newSize: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, size: newSize } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState } from "react";
import { Product } from "../../data/products";

// Updated interface to include a unique identifier
// CartContext.tsx
interface CartItem extends Product {
  uniqueId: string;
  selectedSize: string; // Track selected size separately
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (uniqueId: string) => void;
  updateCartItemSize: (uniqueId: string, newSize: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // CartContext.tsx - addToCart function
  // Update addToCart to accept selectedSize
  const addToCart = (product: Product, selectedSize: string) => {
    const uniqueId = `${product.id}-${selectedSize}`;
    const newCartItem: CartItem = {
      ...product,
      uniqueId,
      selectedSize, // Store selected size
    };
    setCart((prevCart) => [...prevCart, newCartItem]);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.uniqueId !== uniqueId)
    );
  };

  // CartContext.tsx - updateCartItemSize function
  // CartContext.tsx - Fix updateCartItemSize
  const updateCartItemSize = (uniqueId: string, newSize: string) => {
    setCart((prevCart) => {
      const itemToUpdate = prevCart.find((item) => item.uniqueId === uniqueId);
      if (!itemToUpdate) return prevCart;

      // Generate new uniqueId with the new size
      const newUniqueId = `${itemToUpdate.id}-${newSize}`;

      // Create updated item with new selectedSize and uniqueId
      const updatedItem: CartItem = {
        ...itemToUpdate,
        selectedSize: newSize,
        uniqueId: newUniqueId,
      };

      // Replace old item with the updated one
      return [
        ...prevCart.filter((item) => item.uniqueId !== uniqueId),
        updatedItem,
      ];
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItemSize }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
