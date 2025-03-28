import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  uniqueId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (uniqueId: string) => void;
  updateCartItemSize: (uniqueId: string, newSize: string) => void;
  updateCartItemQuantity: (uniqueId: string, newQuantity: number) => void;
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
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '/fallback.jpg',
          quantity,
          size,
          uniqueId
        }
      ];
    });
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prevCart => prevCart.filter(item => item.uniqueId !== uniqueId));
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

  const updateCartItemQuantity = (uniqueId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemSize,
        updateCartItemQuantity
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