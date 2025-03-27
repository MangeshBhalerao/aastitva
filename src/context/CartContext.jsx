import React, { createContext, useState, useEffect } from 'react';

// Create the cart context
export const CartContext = createContext();

// Create provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add item to cart with size, color, and quantity
  const addToCart = (product, size = 'M', color = 'Black', quantity = 1) => {
    setCart(prevCart => {
      // Check if product already exists in cart with same size and color
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, size, color, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, size, color) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && item.size === size && item.color === color)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId && item.size === size && item.color === color) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate cart subtotal
  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Create context value
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartSubtotal
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 