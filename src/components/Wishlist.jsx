import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // State for confirmation modal
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  
  // State for image loading
  const [loadingImages, setLoadingImages] = useState({});
  
  // Handle add to cart and remove from wishlist
  const handleMoveToCart = (product) => {
    // Add to cart with default options
    addToCart(product, 'M', 'Black', 1);
    removeFromWishlist(product.id);
  };
  
  // Show confirmation modal for clearing wishlist
  const confirmClearWishlist = () => {
    setShowConfirmClear(true);
  };
  
  // Handle clear wishlist confirmation
  const handleClearWishlist = () => {
    clearWishlist();
    setShowConfirmClear(false);
  };
  
  // Handle canceling the clear action
  const handleCancelClear = () => {
    setShowConfirmClear(false);
  };
  
  // Navigate to product detail page
  const goToProductDetail = (product) => {
    navigate(`/product/${product.category.toLowerCase()}/${product.id}`);
  };
  
  // Handle image load state
  const handleImageLoad = (productId) => {
    setLoadingImages(prev => ({
      ...prev,
      [productId]: false
    }));
  };
  
  // Initialize loading state for all images
  useEffect(() => {
    const newLoadingState = {};
    wishlist.forEach(item => {
      newLoadingState[item.id] = true;
    });
    setLoadingImages(newLoadingState);
  }, [wishlist]);
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-28 pb-12" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-900 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-24 w-24 text-gray-600 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <p className="text-xl text-gray-400 mb-6">Your wishlist is empty</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-6 py-2 rounded transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Wishlist Items */}
            <div className="lg:w-3/4 w-full">
              <div className="bg-gray-900 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl mb-2 sm:mb-0">{wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}</h2>
                  <button 
                    onClick={confirmClearWishlist}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Clear Wishlist
                  </button>
                </div>
                
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row bg-black rounded-lg overflow-hidden">
                      {/* Product Image with loading state */}
                      <div 
                        className="w-full md:w-1/4 h-48 cursor-pointer relative"
                        onClick={() => goToProductDetail(item)}
                      >
                        {loadingImages[item.id] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                          </div>
                        )}
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onLoad={() => handleImageLoad(item.id)}
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex flex-col justify-between w-full md:w-3/4 p-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 
                              className="text-xl sm:text-2xl text-[#FF0000] mb-2 cursor-pointer hover:underline"
                              onClick={() => goToProductDetail(item)}
                            >
                              {item.title}
                            </h3>
                            <button 
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-gray-400 hover:text-white"
                              aria-label="Remove from wishlist"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="text-gray-400 mb-2">{item.category}</p>
                          <p className="mb-4 text-sm text-gray-300 line-clamp-2">{item.description}</p>
                          <p className="text-xl mb-4">₹{item.price}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
                          <button
                            onClick={() => goToProductDetail(item)}
                            className="bg-transparent border border-white hover:bg-gray-800 text-white px-4 py-2 rounded-sm transition-colors flex-1"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-4 py-2 rounded-sm transition-colors flex-1"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Actions Sidebar */}
            <div className="lg:w-1/4 w-full">
              <div className="bg-gray-900 rounded-lg p-6 lg:sticky lg:top-24">
                <h2 className="text-2xl mb-6">Wishlist Summary</h2>
                <p className="text-gray-400 mb-4">Save items to your wishlist to keep track of what you like.</p>
                
                <div className="space-y-4 mt-8">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-transparent border border-white hover:bg-gray-800 text-white px-4 py-3 rounded-sm transition-colors"
                  >
                    Continue Shopping
                  </button>
                  
                  <button
                    onClick={() => {
                      wishlist.forEach(item => handleMoveToCart(item));
                    }}
                    className="w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-4 py-3 rounded-sm transition-colors"
                  >
                    Move All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Confirmation Modal for Clearing Wishlist */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl mb-4">Clear Wishlist?</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to remove all items from your wishlist? This action cannot be undone.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
              <button
                onClick={handleCancelClear}
                className="flex-1 bg-transparent border border-white hover:bg-gray-800 text-white px-4 py-2 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearWishlist}
                className="flex-1 bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-4 py-2 rounded-sm transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist; 