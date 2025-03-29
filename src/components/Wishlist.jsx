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
    <div className='bg-[#121212] max-w-7xl min-h-fit mx-auto p-4 sm:p-8 pt-28' style={{
      minHeight: 'calc(89vh)',
      fontFamily: 'Bebas Neue, sans-serif',
    }}>
      <h1 className='mb-6 text-5xl md:text-6x lg:mt-20 text-white'>Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-2xl mb-4">Your wishlist is empty</p>
            <p className="text-gray-400 mb-6">Save items you love to your wishlist.</p>
          </div>
          <Link 
            to="/" 
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3 rounded-sm transition-colors duration-300 text-xl inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Wishlist Items Section */}
          <div className="xl:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <div className="hidden sm:flex items-center py-4 border-b border-gray-800 w-full text-gray-400">
                <div className="w-1/2 sm:w-7/12">Product</div>
                <div className="w-1/6 text-center">Price</div>
                <div className="w-1/6 text-center">Actions</div>
              </div>
              <button 
                onClick={confirmClearWishlist}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
            
            <div className="space-y-4">
              {wishlist.map((product, index) => (
                <div key={index} className='flex flex-col sm:flex-row bg-gray-400 bg-opacity-50 border border-gray-800 rounded-md overflow-hidden transition-all duration-300 hover:border-gray-700'>
                  <div className='sm:w-7/12 flex'>
                    {/* Product Image */}
                    <div className='w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0'>
                      {loadingImages[product.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                        </div>
                      )}
                      <img 
                        className='w-full h-full object-cover' 
                        src={product.image} 
                        alt={product.title} 
                        loading="lazy"
                        onLoad={() => handleImageLoad(product.id)}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className='p-4 flex flex-col justify-between flex-grow'>
                      <div>
                        <div className="flex justify-between">
                          <h3 className='text-xl font-medium'>{product.title}</h3>
                          <button 
                            className='text-gray-400 hover:text-white sm:hidden'
                            onClick={() => removeFromWishlist(product.id)}
                            aria-label="Remove item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-1 space-y-1">
                          {product.size && (
                            <p className='text-sm text-gray-300'>
                              <span className="text-gray-400">Size:</span> {product.size}
                            </p>
                          )}
                          
                          {product.color && (
                            <div className='flex items-center text-sm text-gray-300'>
                              <span className="text-gray-400 mr-2">Color:</span> 
                              <span className="flex items-center">
                                <span 
                                  className="inline-block w-3 h-3 rounded-full mr-1"
                                  style={{ backgroundColor: product.color === 'Black' ? '#000' : 
                                                          product.color === 'White' ? '#fff' :
                                                          product.color === 'Red' ? '#f00' :
                                                          product.color === 'Blue' ? '#00f' : '#808080' }}
                                ></span>
                                {product.color}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 hidden sm:block">
                        <Link 
                          to={`/product/${product.category ? product.category.toLowerCase() : 'tshirt'}/${product.id}`}
                          className="text-sm text-[#D32F2F] hover:text-[#EF5350] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                      
                      {/* Mobile Price */}
                      <div className="mt-2 sm:hidden">
                        <p className="text-lg text-[#D32F2F]">₹{product.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Price - hidden on mobile */}
                  <div className='hidden sm:flex w-1/6 items-center justify-center'>
                    <p className='text-lg text-[#D32F2F]'>₹{product.price}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className='px-4 py-3 sm:py-0 sm:w-1/6 flex items-center justify-center space-x-2'>
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-sm transition-colors"
                    >
                      Add to Cart
                    </button>
                    
                    {/* Desktop Remove Button - hidden on mobile */}
                    <button 
                      className='hidden sm:block text-gray-400 hover:text-white'
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="xl:w-1/3">
            <div className="bg-gray-400 bg-opacity-50 border border-gray-800 rounded-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Wishlist Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Items</span>
                  <span>{wishlist.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value</span>
                  <span className="text-[#D32F2F]">₹{wishlist.reduce((total, item) => total + item.price, 0)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    wishlist.forEach(item => handleMoveToCart(item));
                  }}
                  className="block w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-center py-3 rounded-sm transition-colors"
                >
                  Move All to Cart
                </button>
                <Link 
                  to="/" 
                  className="block w-full bg-transparent border border-gray-600 hover:border-white text-white text-center py-3 rounded-sm transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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
                className="flex-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-sm transition-colors"
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