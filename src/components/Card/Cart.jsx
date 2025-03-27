import React, { createContext, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// Create the CartContext
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    // Check if the product with the same ID, size and color already exists
    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === product.selectedSize && 
      item.selectedColor === product.selectedColor
    );

    if (existingItemIndex !== -1) {
      // If it exists, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = 
        (updatedCart[existingItemIndex].quantity || 1) + (product.quantity || 1);
      setCart(updatedCart);
    } else {
      // Otherwise add as a new item
      setCart([...cart, product]);
    }
  }

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + (parseFloat(item.price) * quantity);
    }, 0);
  }

  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Cart component
function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext)

  return (
    <div className='bg-[#0D0D0D] max-w-7xl min-h-fit mx-auto p-4 sm:p-8 pt-24' style={{
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
            <div className="hidden sm:flex items-center py-4 border-b border-gray-800 mb-4 text-gray-400">
              <div className="w-1/2 sm:w-7/12">Product</div>
              <div className="w-1/6 text-center">Price</div>
              <div className="w-1/6 text-center">Quantity</div>
              <div className="w-1/6 text-center">Total</div>
            </div>
            
            <div className="space-y-4">
              {cart.map((product, index) => {
                const itemTotal = product.price * (product.quantity || 1);
                
                return (
                  <div key={index} className='flex flex-col sm:flex-row bg-black bg-opacity-50 border border-gray-800 rounded-md overflow-hidden transition-all duration-300 hover:border-gray-700'>
                    <div className='sm:w-7/12 flex'>
                      {/* Product Image */}
                      <div className='w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0'>
                        <img 
                          className='w-full h-full object-cover' 
                          src={product.image} 
                          alt={product.title} 
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className='p-4 flex flex-col justify-between flex-grow'>
                        <div>
                          <div className="flex justify-between">
                            <h3 className='text-xl font-medium'>{product.title}</h3>
                            <button 
                              className='text-gray-400 hover:text-white sm:hidden'
                              onClick={() => removeFromCart(index)}
                              aria-label="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="mt-1 space-y-1">
                            {product.selectedSize && (
                              <p className='text-sm text-gray-300'>
                                <span className="text-gray-400">Size:</span> {product.selectedSize}
                              </p>
                            )}
                            
                            {product.selectedColor && (
                              <div className='flex items-center text-sm text-gray-300'>
                                <span className="text-gray-400 mr-2">Color:</span> 
                                <span className="flex items-center">
                                  <span 
                                    className="inline-block w-3 h-3 rounded-full mr-1"
                                    style={{ backgroundColor: product.selectedColor === 'Black' ? '#000' : 
                                                            product.selectedColor === 'White' ? '#fff' :
                                                            product.selectedColor === 'Red' ? '#f00' :
                                                            product.selectedColor === 'Blue' ? '#00f' : '#808080' }}
                                  ></span>
                                  {product.selectedColor}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-2 hidden sm:block">
                          <Link 
                            to={`/product/${product.category.toLowerCase()}/${product.id}`}
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
                          onClick={() => updateQuantity(index, (product.quantity || 1) - 1)}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="bg-gray-900 w-10 h-8 flex items-center justify-center text-center">
                          {product.quantity || 1}
                        </span>
                        <button 
                          className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-r-md hover:bg-gray-700 transition-colors"
                          onClick={() => updateQuantity(index, (product.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total - hidden on mobile */}
                    <div className='hidden sm:flex w-1/6 items-center justify-center'>
                      <p className='text-lg font-medium'>₹{itemTotal.toFixed(2)}</p>
                    </div>
                    
                    {/* Mobile Item Total */}
                    <div className='px-4 pb-3 flex justify-between items-center sm:hidden'>
                      <span className="text-gray-400">Total:</span>
                      <p className='text-lg font-medium'>₹{itemTotal.toFixed(2)}</p>
                    </div>
                    
                    {/* Remove Button - visible only on desktop */}
                    <button 
                      className='hidden sm:flex absolute top-4 right-4 text-gray-400 hover:text-white'
                      onClick={() => removeFromCart(index)}
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="xl:w-1/3">
            <div className="bg-black bg-opacity-50 border border-gray-800 p-6 rounded-md sticky top-24">
              <h2 className="text-3xl mb-6 pb-4 border-b border-gray-800">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                {getCartTotal() < 500 && (
                  <div className="text-sm text-gray-400 italic">
                    Free shipping on orders above ₹500
                  </div>
                )}
                {getCartTotal() >= 500 && (
                  <div className="text-sm text-green-500">
                    You've qualified for free shipping!
                  </div>
                )}
              </div>
              
              <div className="flex justify-between font-medium text-xl border-t border-gray-800 pt-6 mb-8">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              
              <Link 
                to="/buy" 
                className="block bg-[#AD2A2A] hover:bg-[#8B0000] text-white text-center px-6 py-4 rounded-sm text-xl mb-4 transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                to="/" 
                className="block text-center py-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                Continue Shopping
              </Link>
              
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-xl mb-4">We Accept</h3>
                <div className="flex space-x-3">
                  <div className="bg-gray-800 p-2 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-gray-200">
                      <path fill="currentColor" d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    </svg>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3,5A2,2 0 0,0 1,7V17A2,2 0 0,0 3,19H21A2,2 0 0,0 23,17V7A2,2 0 0,0 21,5H3M3,7H21V17H3V7M5,9V10H7V9H5M8,9V10H10V9H8M11,9V10H13V9H11M14,9V10H16V9H14M17,9V10H19V9H17M5,11V12H7V11H5M8,11V12H10V11H8M11,11V12H13V11H11M14,11V12H16V11H14M17,11V12H19V11H17M5,13V14H7V13H5M8,13V14H10V13H8M11,13V14H13V13H11M14,13V14H16V13H14M17,13V14H19V13H17M5,15V16H7V15H5M8,15V16H10V15H8M11,15V16H13V15H11M14,15V16H16V15H14M17,15V16H19V15H17Z" />
                    </svg>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M17.5 14.33C18.29 14.33 19.13 14.41 20 14.57V16.07C19.38 15.91 18.54 15.83 17.5 15.83C15.6 15.83 14.11 16.16 13 16.82V15.13C14.17 14.6 15.67 14.33 17.5 14.33M13 12.46C14.29 11.93 15.79 11.67 17.5 11.67C18.29 11.67 19.13 11.74 20 11.9V13.4C19.38 13.24 18.54 13.16 17.5 13.16C15.6 13.16 14.11 13.5 13 14.15M17.5 10.5C15.6 10.5 14.11 10.82 13 11.5V9.84C14.23 9.28 15.73 9 17.5 9C18.29 9 19.13 9.08 20 9.23V10.78C19.26 10.59 18.41 10.5 17.5 10.5M21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 6.95 12 8V18.5C12 19.1 12.1 19.5 12.5 19.5C13.97 19.5 16.27 17 17.5 17C19.77 17 21 19 21 19.5C21 19.73 21.03 20 21.03 20H21V18.5M22 6.5H22V18L22 18.5V20H22C22 20 22 21 21 21C20 21 19 20 17.5 20C16.09 20 14.23 22 12.5 22C11 22 11 21 11 20V18C11 18 11 16 11 14V8C11 8 11 6.5 12 6.5C13 6.5 14 8 17.5 8C20 8 22 6.5 22 6.5H22Z" />
                    </svg>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4,12H20V14H4V12M4,9H20V11H4V9M16,4L12,8L8,4H11V1H13V4H16M8,19L12,15L16,19H13V22H11V19H8Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart