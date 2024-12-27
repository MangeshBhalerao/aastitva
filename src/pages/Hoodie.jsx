import React, { useContext } from 'react'
import { CartContext } from '../components/Card/Cart'

function Hoodie() {
  const { addToCart } = useContext(CartContext)

  const products = [
    {
      id: 1,
      image: 'https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785',
      title: 'Hoodie 1',
      description: 'This is a description of Hoodie 1.',
      price: '600'
    },
    // Add more products as needed
  ]

  return (
    <div className='bg-[#500303] text-white' style={{ 
      backgroundImage: 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzZ2dXkxY2ZhOHliZzhycmc5ZTgwZ3MwemhreGozY2E0amptb3ZmNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnsbC3jy9dfAFcA8VW/giphy.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backdropAttachment: 'fixed',
      fontFamily: 'Bebas Neue, sans-serif'
    }}>
      <div className='bg-cover bg-center h-[10vh] flex items-center justify-center'>
        <h1 className='text-5xl font-bold'>HOODIES</h1>
      </div>

      <div className='max-w-7xl mx-auto p-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map(product => (
            <div key={product.id} className='bg-black p-4 rounded-lg'>
              <div className='w-full aspect-w-1 aspect-h-1'>
                <img className='w-full h-full object-cover rounded-lg mb-4' src={product.image} alt={product.title} />
              </div>
              <h3 className='text-xl'>{product.title}</h3>
              <p className='text-lg'>Price: ₹{product.price}</p>
              <div className='flex space-x-2' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                <button className='bg-red-600 px-4 py-2 rounded-full text-lg font-semibold text-white'>BUY</button>
                <button className='bg-red-600 px-4 py-2 rounded-full text-lg font-semibold text-white ' onClick={() => addToCart(product)}>CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hoodie