import React, { createContext, useState, useEffect } from 'react';

// Create the wishlist context (updated for refresh)
export const WishlistContext = createContext();

// Create a provider component to wrap our app
export const WishlistProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error parsing wishlist from localStorage:', error);
      return [];
    }
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
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
  
  // Get wishlist count for the navbar
  const getWishlistCount = () => {
    return wishlist.length;
  };

  // Create the context value
  const contextValue = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider; 