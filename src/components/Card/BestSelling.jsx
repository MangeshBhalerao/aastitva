import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import ProductCard from '../../components/Card/ProductCard'

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
    },
    {
      id: 4,
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
    <div className='w-full min-h-screen bg-[#500303] text-white' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("")',
      backgroundSize: 'cover',
      
      backgroundPosition: 'center',
    }}>
      <h1 className='text-5xl w-full bg-black bg-opacity-70 backdrop-blur-md p-4 text-center text-white font-thin mb-8 border-t border-b'>BEST SELLING</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center'>
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product} 
            addToCart={handleAddToCart} 
            buyNow={handleBuyNow} 
          />
        ))}
      </div>
    </div>
  )
}

export default BestSelling