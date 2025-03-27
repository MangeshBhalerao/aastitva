import React, { createContext, useState, useEffect } from 'react';

// Create the wishlist context
export const WishlistContext = createContext();

// Create a provider component to wrap our app
export const WishlistProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add an item to the wishlist
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      // Check if the product is already in the wishlist
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  // Remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
  };

  // Toggle an item in the wishlist (add if not present, remove if present)
  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const existingItemIndex = prevWishlist.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Remove if already in wishlist
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        // Add if not in wishlist
        return [...prevWishlist, product];
      }
    });
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Create the context value
  const contextValue = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider; 