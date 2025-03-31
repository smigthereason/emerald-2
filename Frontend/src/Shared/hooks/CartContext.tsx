// import React, { createContext, useContext, useState } from "react";

// interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   quantity: number;
//   size: string;
//   uniqueId: string;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product, size: string, quantity: number) => void;
//   removeFromCart: (uniqueId: string) => void;
//   updateCartItemSize: (uniqueId: string, newSize: string) => void;
//   updateCartItemQuantity: (uniqueId: string, newQuantity: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: Product, size: string, quantity: number = 1) => {
//     const uniqueId = `${product.id}-${size}`;
    
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.uniqueId === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.uniqueId === uniqueId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
      
//       return [
//         ...prevCart,
//         {
//           id: product.id,
//           title: product.title,
//           price: product.price,
//           image: product.images?.[0] || '/fallback.jpg',
//           quantity,
//           size,
//           uniqueId
//         }
//       ];
//     });
//   };

//   const removeFromCart = (uniqueId: string) => {
//     setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
//   };

//   const updateCartItemSize = (uniqueId: string, newSize: string) => {
//     setCart(prevCart => {
//       const itemToUpdate = prevCart.find(item => item.uniqueId === uniqueId);
//       if (!itemToUpdate) return prevCart;

//       const newUniqueId = `${itemToUpdate.id}-${newSize}`;
      
//       // Check if item with new size already exists
//       const existingItem = prevCart.find(item => item.uniqueId === newUniqueId);
      
//       if (existingItem) {
//         // Merge quantities
//         return prevCart
//           .filter(item => item.uniqueId !== uniqueId)
//           .map(item => 
//             item.uniqueId === newUniqueId
//               ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
//               : item
//           );
//       }
      
//       // Create new item with updated size
//       return [
//         ...prevCart.filter(item => item.uniqueId !== uniqueId),
//         {
//           ...itemToUpdate,
//           size: newSize,
//           uniqueId: newUniqueId
//         }
//       ];
//     });
//   };

//   const updateCartItemQuantity = (uniqueId: string, newQuantity: number) => {
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.uniqueId === uniqueId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateCartItemSize,
//         updateCartItemQuantity
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState } from "react";

// Define the Product interface that's used as a parameter
interface Product {
  id: number;
  title: string;
  price: number;
  images?: string[];
}

interface CartItem {
  id: string; // Changed to string to match CartItem component
  name: string; // Changed from title to name to match CartItem component
  price: number;
  image: string;
  quantity: number;
  size: string;
  uniqueId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (id: string) => void; // Changed to accept id instead of uniqueId
  updateQuantity: (id: string, newQuantity: number) => void; // Changed function name to match CartItem
  updateCartItemSize: (uniqueId: string, newSize: string) => void;
  getCartTotal: () => number; // Added to calculate cart total
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const uniqueId = `${product.id}-${size}`;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.uniqueId === uniqueId);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [
        ...prevCart,
        {
          id: String(product.id), // Convert to string to match CartItem
          uniqueId,
          name: product.title, // Changed from title to name
          price: product.price,
          image: product.images?.[0] || '/fallback.jpg',
          quantity,
          size
        }
      ];
    });
  };

  // Updated to find the item by id (which might be uniqueId)
  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => 
      item.id === id || item.uniqueId === id
    ));
  };

  const updateCartItemSize = (uniqueId: string, newSize: string) => {
    setCart(prevCart => {
      const itemToUpdate = prevCart.find(item => item.uniqueId === uniqueId);
      if (!itemToUpdate) return prevCart;

      const newUniqueId = `${itemToUpdate.id}-${newSize}`;
      
      // Check if item with new size already exists
      const existingItem = prevCart.find(item => item.uniqueId === newUniqueId);
      
      if (existingItem) {
        // Merge quantities
        return prevCart
          .filter(item => item.uniqueId !== uniqueId)
          .map(item => 
            item.uniqueId === newUniqueId
              ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
              : item
          );
      }
      
      // Create new item with updated size
      return [
        ...prevCart.filter(item => item.uniqueId !== uniqueId),
        {
          ...itemToUpdate,
          size: newSize,
          uniqueId: newUniqueId
        }
      ];
    });
  };

  // Renamed from updateCartItemQuantity to match CartItem component
  const updateQuantity = (id: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id || item.uniqueId === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Added to calculate the total price of items in cart
  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity, // Changed function name to match CartItem
        updateCartItemSize,
        getCartTotal // Added new function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;