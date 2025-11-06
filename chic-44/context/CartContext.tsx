
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity, selectedSize, selectedColor }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number, size: string, color: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)));
  }, []);

  const updateQuantity = useCallback((productId: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);
  
  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
