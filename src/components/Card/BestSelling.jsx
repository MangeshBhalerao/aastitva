import React, { useContext } from 'react'
import { CartContext } from './Cart'

function BestSelling() {
  const { addToCart } = useContext(CartContext)

  const products = [
    {
      id: 1,
      image: 'https://thesagacity.s3.ap-south-1.amazonaws.com/media/Nerv_hoodie_back.jpg.webp',
      title: 'Best Selling Product 1',
      description: 'This is a description of Best Selling Product 1.',
      price: '600'
    },
    {
      id: 2,
      image: 'https://thesagacity.s3.ap-south-1.amazonaws.com/media/Nerv_hoodie_back.jpg.webp',
      title: 'Best Selling Product 2',
      description: 'This is a description of Best Selling Product 2.',
      price: '700'
    },
    {
      id: 3,
      image: 'https://thesagacity.s3.ap-south-1.amazonaws.com/media/Nerv_hoodie_back.jpg.webp',
      title: 'Best Selling Product 3',
      description: 'This is a description of Best Selling Product 3.',
      price: '800'
    }
    // Add more products as needed
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleBuyNow = (product) => {
    // Implement the buy now functionality here
    console.log(`Buying product: ${product.title}`)
  }

  return (
    <div className='w-full min-h-screen bg-[#500303] text-white p-4' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h1 className='text-5xl text-center text-white font-thin mb-8'>BEST SELLING</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center'>
        {products.map((product, index) => (
          <div key={index} className='max-w-sm py-2 rounded overflow-hidden shadow-lg bg-black text-white m-4'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover' src={product.image} alt={product.title} />
            </div>
            <div className='px-6 py-4'>
              <div className='font-bold text-3xl mb-2 text-red-600'>{product.title}</div>
              <p className='text-base'>
                {product.description}
              </p>
            </div>
            <div className='px-6 pt-4 pb-2 flex justify-between items-center mb-2'>
              <span className='inline-block bg-red-600 rounded-full px-3 py-1 text-2xl text-white'>₹{product.price}</span>
              <button 
                className='bg-red-600 px-3 py-1 rounded-full text-2xl text-white'
                onClick={() => handleAddToCart(product)}
              >
                Cart
              </button>
              <button 
                className='bg-white px-3 py-1 rounded-full text-2xl text-black ml-2'
                onClick={() => handleBuyNow(product)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSelling