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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

// Cart component
function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext)

  return (
    <div className='max-w-7xl min-h-fit mx-auto p-8 pt-24' style={{
      minHeight: 'calc(89vh)',
      fontFamily: 'Bebas Neue, sans-serif',
      }}>
      <h1 className='mb-4 md:text-6xl'>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-8">Your cart is empty.</p>
          <Link 
            to="/" 
            className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-6 py-3 rounded transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cart.map((product, index) => (
              <div key={index} className='flex flex-col sm:flex-row bg-black rounded-lg mb-4 overflow-hidden'>
                <div className='sm:w-1/3 aspect-w-1 aspect-h-1'>
                  <img 
                    className='w-full h-full object-cover' 
                    src={product.image} 
                    alt={product.title} 
                  />
                </div>
                <div className='sm:w-2/3 p-4'>
                  <div className="flex justify-between">
                    <h3 className='text-xl mb-2'>{product.title}</h3>
                    <button 
                      className='text-gray-400 hover:text-white'
                      onClick={() => removeFromCart(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className='text-lg text-[#FF0000] mb-2'>₹{product.price}</p>
                  
                  {/* Product options */}
                  <div className="space-y-2 mt-2">
                    {product.selectedSize && (
                      <p className='text-sm text-gray-300'>
                        <span className="text-gray-400">Size:</span> {product.selectedSize}
                      </p>
                    )}
                    
                    {product.selectedColor && (
                      <p className='text-sm text-gray-300'>
                        <span className="text-gray-400">Color:</span> {product.selectedColor}
                      </p>
                    )}
                    
                    <div className='flex items-center space-x-2 mt-4'>
                      <span className="text-gray-400">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          className="bg-gray-800 px-2 py-1 rounded-l-md hover:bg-gray-700"
                          onClick={() => updateQuantity(index, (product.quantity || 1) - 1)}
                        >
                          -
                        </button>
                        <span className="bg-gray-900 px-3 py-1">
                          {product.quantity || 1}
                        </span>
                        <button 
                          className="bg-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-700"
                          onClick={() => updateQuantity(index, (product.quantity || 1) + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Link 
                      to={`/product/${product.category.toLowerCase()}/${product.id}`}
                      className="text-gray-400 hover:text-white text-sm underline"
                    >
                      View Product Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-black p-6 rounded-lg sticky top-24">
              <h2 className="text-2xl mb-4">Order Summary</h2>
              
              <div className="border-t border-gray-800 py-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t border-gray-800 pt-4 mt-4">
                  <span>Total</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/buy" 
                className="block bg-[#AD2A2A] hover:bg-[#8B0000] text-white text-center px-6 py-3 rounded mt-6 transition-colors duration-300"
              >
                Checkout
              </Link>
              
              <Link 
                to="/" 
                className="block text-center mt-4 text-gray-400 hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart