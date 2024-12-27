import React, { createContext, useState, useContext } from 'react'

// Create the CartContext
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Cart component
function Cart() {
  const { cart, removeFromCart } = useContext(CartContext)

  return (
    <div className='max-w-7xl mx-auto p-8'>
      <h1 className='text-3xl mb-4'>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {cart.map(product => (
            <div key={product.id} className='bg-black p-4 rounded-lg'>
              <div className='w-full aspect-w-1 aspect-h-1'>
                <img className='w-full h-full object-cover rounded-lg mb-4' src={product.image} alt={product.title} />
              </div>
              <h3 className='text-xl mb-2'>{product.title}</h3>
              <p className='text-lg'>Price: ₹{product.price}</p>
              <button className='bg-red-600 px-4 py-2 rounded-full text-lg font-semibold text-white' onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cart