import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  
  // Check if product is in wishlist
  const productInWishlist = isInWishlist(product.id);
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Toggle quick view
  const toggleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(!showQuickView);
  };
  
  // Close quick view when clicking outside
  const closeQuickView = () => {
    setShowQuickView(false);
  };
  
  // Navigate to product detail page
  const goToProductDetail = () => {
    navigate(`/product/${product.category.toLowerCase()}/${product.id}`);
  };
  
  // Handle toggle wishlist
  const handleToggleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    toggleWishlist(product);
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle add to cart with default options
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    addToCart(product, 'M', 'Black', 1);
    
    // Show mini notification (this could be enhanced with a proper notification system)
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
  };

  return (
    <>
      <div 
        className='relative h-[450px] rounded-lg overflow-hidden shadow-lg bg-[#0D0D0D] text-white m-1 z-10 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-transparent hover:border-gray-700'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={goToProductDetail}
      >
        {/* Image container with fixed height */}
        <div className='relative w-full h-64 overflow-hidden'>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
          )}
          
          <img 
            className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
            src={product.image} 
            alt={product.title}
            loading="lazy"
            onLoad={handleImageLoad}
          />
          
          {/* Hover overlay with quick view */}
          <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'
          } flex items-center justify-center`}>
            <button 
              onClick={toggleQuickView}
              className='bg-white text-black px-4 py-2 rounded hover:bg-[#AD2A2A] hover:text-white transition-colors duration-300 transform hover:scale-105'
            >
              Quick View
            </button>
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full z-20 transition-all duration-300 shadow-md ${
              productInWishlist 
                ? 'bg-[#AD2A2A] text-white' 
                : 'bg-black bg-opacity-70 text-white hover:bg-[#AD2A2A]'
            }`}
            aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill={productInWishlist ? "currentColor" : "none"} 
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
          </button>
          
          {/* Category tag */}
          <div className='absolute top-3 left-3 z-20'>
            <span className='bg-[#AD2A2A] text-white text-xs px-2 py-1 rounded-md shadow-md'>
              {product.category}
            </span>
          </div>
      </div>
        
        {/* Product content */}
        <div className='p-4 flex flex-col h-[calc(450px-256px)]'>
          <h3 className='text-xl font-bold mb-2 text-[#FF0000] line-clamp-1'>{product.title}</h3>
          <p className='text-sm text-gray-300 mb-4 flex-grow line-clamp-3'>
          {product.description}
        </p>
          
          {/* Price and actions */}
          <div className='mt-auto'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-xl font-bold'>₹{product.price}</span>
              {product.oldPrice && (
                <span className='text-sm line-through text-gray-400'>₹{product.oldPrice}</span>
              )}
            </div>
            
            <button 
              className='w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-2 rounded transition-colors duration-300 flex items-center justify-center'
              onClick={handleAddToCart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4' onClick={closeQuickView}>
          <div className='bg-[#0D0D0D] rounded-lg max-w-4xl w-full overflow-hidden border border-gray-700' onClick={e => e.stopPropagation()}>
            <div className='flex flex-col md:flex-row'>
              {/* Product Image */}
              <div className='w-full md:w-1/2 relative'>
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                )}
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className='w-full h-full object-cover' 
                  loading="lazy" 
                />
                
                {/* Wishlist button in modal */}
                <button
                  onClick={handleToggleWishlist}
                  className={`absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-300 shadow-md ${
                    productInWishlist 
                      ? 'bg-[#AD2A2A] text-white' 
                      : 'bg-black bg-opacity-70 text-white hover:bg-[#AD2A2A]'
                  }`}
                  aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill={productInWishlist ? "currentColor" : "none"} 
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
                </button>
              </div>
              
              {/* Product Details */}
              <div className='w-full md:w-1/2 p-6 flex flex-col'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-2xl font-bold text-[#FF0000] mb-2'>{product.title}</h2>
                  <button onClick={closeQuickView} className='text-gray-400 hover:text-white p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className='mb-4 flex items-center'>
                  <span className='text-2xl font-bold mr-2'>₹{product.price}</span>
                  {product.oldPrice && (
                    <span className='text-sm line-through text-gray-400'>₹{product.oldPrice}</span>
                  )}
                </div>
                
                <p className='text-gray-300 mb-6'>{product.description}</p>
                
                {/* Size options (simulated) */}
                <div className='mb-4'>
                  <h3 className='text-sm text-gray-400 mb-2'>Size:</h3>
                  <div className='flex space-x-2'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button 
                        key={size}
                        className='w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors'
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color options (simulated) */}
                <div className='mb-6'>
                  <h3 className='text-sm text-gray-400 mb-2'>Color:</h3>
                  <div className='flex space-x-2'>
                    {[
                      { name: 'Black', value: '#000' },
                      { name: 'White', value: '#fff' },
                      { name: 'Red', value: '#f00' },
                      { name: 'Blue', value: '#00f' }
                    ].map((color) => (
                      <button 
                        key={color.name}
                        className='w-8 h-8 rounded-full border border-gray-700 hover:border-white transition-colors'
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                      ></button>
                    ))}
                  </div>
                </div>
                
                <div className='product-meta space-y-2 mb-6'>
                  {product.design && (
                    <div className='text-sm'>
                      <span className='text-gray-400'>Design:</span> {product.design}
                    </div>
                  )}
                  
                  <div className='text-sm'>
                    <span className='text-gray-400'>Category:</span> {product.category}
                  </div>
                </div>
                
                <div className='flex flex-col space-y-3 mt-auto'>
                  <button 
                    onClick={() => {
                      handleAddToCart({ stopPropagation: () => {} });
                      closeQuickView();
                    }}
                    className='bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-3 rounded transition-colors duration-300 flex items-center justify-center'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  
        <button 
                    onClick={() => {
                      closeQuickView();
                      goToProductDetail();
                    }}
                    className='border border-gray-700 hover:border-white text-white py-3 rounded transition-colors duration-300'
        >
                    View Full Details
        </button>
      </div>
    </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard