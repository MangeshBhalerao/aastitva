import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

// Cart component
function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartSubtotal, clearCart } = useContext(CartContext)
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Handle confirming cart clear
  const confirmClearCart = () => {
    setShowConfirmClear(true);
  };

  // Handle clearing cart
  const handleClearCart = () => {
    clearCart();
    setShowConfirmClear(false);
  };

  // Cancel clearing cart
  const handleCancelClear = () => {
    setShowConfirmClear(false);
  };

  return (
    <div className='bg-[#0D0D0D] max-w-7xl min-h-fit mx-auto p-4 sm:p-8 pt-28' style={{
      minHeight: 'calc(89vh)',
      fontFamily: 'Bebas Neue, sans-serif',
      }}>
      <h1 className='mb-6 text-5xl md:text-6x text-white'>Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-2xl mb-4">Your cart is empty</p>
            <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
          </div>
          <Link 
            to="/" 
            className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-8 py-3 rounded-sm transition-colors duration-300 text-xl inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="xl:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <div className="hidden sm:flex items-center py-4 border-b border-gray-800 w-full text-gray-400">
                <div className="w-1/2 sm:w-7/12">Product</div>
                <div className="w-1/6 text-center">Price</div>
                <div className="w-1/6 text-center">Quantity</div>
                <div className="w-1/6 text-center">Total</div>
              </div>
              <button 
                onClick={confirmClearCart}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="space-y-4">
              {cart.map((product, index) => {
                const itemTotal = product.price * product.quantity;
                
                return (
                  <div key={index} className='flex flex-col sm:flex-row bg-gray-400 bg-opacity-50 border border-gray-800 rounded-md overflow-hidden transition-all duration-300 hover:border-gray-700'>
                    <div className='sm:w-7/12 flex'>
                      {/* Product Image */}
                      <div className='w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0'>
                        <img 
                          className='w-full h-full object-cover' 
                          src={product.image} 
                          alt={product.title} 
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className='p-4 flex flex-col justify-between flex-grow'>
                        <div>
                          <div className="flex justify-between">
                            <h3 className='text-xl font-medium'>{product.title}</h3>
                            <button 
                              className='text-gray-400 hover:text-white sm:hidden'
                              onClick={() => removeFromCart(product.id, product.size, product.color)}
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
                            className="text-sm text-[#AD2A2A] hover:text-[#FF0000] transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                        
                        {/* Mobile Price */}
                        <div className="mt-2 sm:hidden">
                          <p className="text-lg text-[#FF0000]">₹{product.price}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Price - hidden on mobile */}
                    <div className='hidden sm:flex w-1/6 items-center justify-center'>
                      <p className='text-lg text-[#FF0000]'>₹{product.price}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className='px-4 py-3 sm:py-0 sm:w-1/6 flex items-center justify-center'>
                      <div className="flex items-center">
                        <button 
                          className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-l-md hover:bg-gray-700 transition-colors"
                          onClick={() => updateQuantity(product.id, product.size, product.color, product.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="bg-gray-900 w-10 h-8 flex items-center justify-center text-center">
                          {product.quantity}
                        </span>
                        <button 
                          className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-r-md hover:bg-gray-700 transition-colors"
                          onClick={() => updateQuantity(product.id, product.size, product.color, product.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Total Price */}
                    <div className='flex items-center justify-between px-4 py-3 sm:py-0 sm:w-1/6 sm:justify-center sm:px-0 bg-gray-900 sm:bg-transparent'>
                      <span className="sm:hidden">Total:</span>
                      <p className='text-lg text-[#FF0000]'>₹{itemTotal}</p>
                      
                      {/* Desktop Remove Button - hidden on mobile */}
                      <button 
                        className='hidden sm:block text-gray-400 hover:text-white ml-4'
                        onClick={() => removeFromCart(product.id, product.size, product.color)}
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="xl:w-1/3">
            <div className="bg-gray-400 bg-opacity-50 border border-gray-800 rounded-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{getCartSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                {getCartSubtotal() < 500 && (
                  <div className="text-sm text-[#FF0000] mt-1">
                    Add ₹{500 - getCartSubtotal()} more to get free shipping
                  </div>
                )}
                <div className="border-t border-gray-800 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₹{getCartSubtotal()}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Including all taxes
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link 
                  to="/buy" 
                  className="block w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white text-center py-3 rounded-sm transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  to="/" 
                  className="block w-full bg-transparent border border-gray-600 hover:border-white text-white text-center py-3 rounded-sm transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-gray-400">
                <h3 className="font-medium text-white mb-2">Secure Checkout</h3>
                <p>We accept all major credit cards and debit cards. Your payment information is secure.</p>
                <div className="flex space-x-2 mt-4">
                  {/* Payment method icons */}
                  <div className="w-12 h-6 bg-gray-600 rounded"></div>
                  <div className="w-12 h-6 bg-gray-600 rounded"></div>
                  <div className="w-12 h-6 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Clearing Cart */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl mb-4">Clear Cart?</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to remove all items from your cart? This action cannot be undone.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
              <button
                onClick={handleCancelClear}
                className="flex-1 bg-transparent border border-white hover:bg-gray-800 text-white px-4 py-2 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-4 py-2 rounded-sm transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart