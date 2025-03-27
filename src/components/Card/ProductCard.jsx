import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WishlistContext } from '../../context/WishlistContext';

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  
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

  return (
    <>
      <div 
        className='relative max-w-sm py-4 rounded overflow-hidden shadow-lg bg-[#0D0D0D] text-white m-2 z-10 transition-transform duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={goToProductDetail}
      >
        <div className='absolute top-0 left-0 w-full h-64 overflow-hidden z-10'>
          <img 
            className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`} 
            src={product.image} 
            alt={product.title} 
          />
          {isHovered && (
            <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
              <button 
                onClick={toggleQuickView}
                className='bg-white text-black px-4 py-2 rounded-sm hover:bg-[#AD2A2A] hover:text-white transition-colors duration-300'
              >
                Quick View
              </button>
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full z-20 transition-all duration-300 ${
              productInWishlist 
                ? 'bg-[#AD2A2A] text-white' 
                : 'bg-black bg-opacity-50 text-white hover:bg-[#AD2A2A]'
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
        </div>
        <div className='relative pt-64 px-6 py-4 z-20'>
          <div className='text-3xl mb-2 text-[#FF0000]'>{product.title}</div>
          <p className='text-base'>
            {product.description}
          </p>
        </div>
        <div className='px-6 pt-4 pb-2 flex flex-row justify-between items-center mb-2 z-20'>
          <span className='inline-block bg-[#8B0000] rounded-full px-3 py-1 text-2xl text-white'>₹{product.price}</span>
          <button 
            className='bg-[#FF0000] px-3 py-1 rounded-full text-2xl text-white hover:bg-[#8B0000] transition-colors duration-300'
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to detail page
              addToCart(product);
            }}
          >
            {isHovered ? 'Add to Cart' : 'Cart'}
          </button>
        </div>
        
        {/* Category tag */}
        <div className='absolute top-2 left-2 z-20'>
          <span className='bg-[#AD2A2A] text-white text-sm px-2 py-1 rounded'>
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50' onClick={closeQuickView}>
          <div className='bg-[#0D0D0D] rounded-lg max-w-4xl w-full mx-4 overflow-hidden' onClick={e => e.stopPropagation()}>
            <div className='flex flex-col md:flex-row'>
              {/* Product Image */}
              <div className='w-full md:w-1/2 relative'>
                <img src={product.image} alt={product.title} className='w-full h-full object-cover' />
                
                {/* Wishlist button in modal */}
                <button
                  onClick={handleToggleWishlist}
                  className={`absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-300 ${
                    productInWishlist 
                      ? 'bg-[#AD2A2A] text-white' 
                      : 'bg-black bg-opacity-50 text-white hover:bg-[#AD2A2A]'
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
                  <h2 className='text-3xl text-[#FF0000] mb-2'>{product.title}</h2>
                  <button onClick={closeQuickView} className='text-gray-400 hover:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className='mb-4'>
                  <span className='inline-block bg-[#8B0000] rounded-sm px-3 py-1 text-2xl text-white'>₹{product.price}</span>
                </div>
                
                <p className='text-gray-300 mb-6'>{product.description}</p>
                
                {product.design && (
                  <div className='mb-4'>
                    <span className='text-gray-400'>Design:</span> {product.design}
                  </div>
                )}
                
                <div className='mb-6'>
                  <span className='text-gray-400'>Category:</span> {product.category}
                </div>
                
                <div className='flex space-x-4 mt-auto'>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      closeQuickView();
                    }}
                    className='bg-[#FF0000] px-6 py-2 rounded text-lg text-white hover:bg-[#8B0000] transition-colors duration-300 flex-grow'
                  >
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={() => {
                      closeQuickView();
                      goToProductDetail();
                    }}
                    className='border border-white px-6 py-2 rounded text-lg text-white hover:bg-white hover:text-black transition-colors duration-300'
                  >
                    View Details
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