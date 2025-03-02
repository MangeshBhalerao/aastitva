import React, { useState } from 'react'
import Sweatshirtproducts from '../../data/Sweatshirtproducts'
import ProductCard from '../../components/Card/ProductCard'

function Allsweatshirt() {
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price

  const allProducts = priceRange === 1000 
    ? Sweatshirtproducts.filter(product => product.category === 'Sweatshirt')
    : Sweatshirtproducts.filter(product => product.category === 'Sweatshirt' && product.price <= priceRange)

  const addToCart = (product) => {
    // Add product to cart logic here
    console.log(`Added ${product.title} to cart`)
  }

  return (
    <div className='w-full min-h-screen bg-[#0D0D0D] text-white p-4' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='flex'>
        <div className='w-1/4 p-4 bg-[#2F2F2F] rounded-lg' style={{ height: '100vh' }}>
          <h2 className='text-3xl mb-4 text-[#FF0000]'>Filter</h2>
          <div className='mt-4'>
            <label htmlFor='priceRange' className='block text-2xl text-white mb-2'>Max Price: ₹{priceRange}</label>
            <input 
              type='range' 
              id='priceRange' 
              min='0' 
              max='1000' 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)} 
              className='w-full price-slider'
              style={{
                background: `linear-gradient(to right, #FF0000 ${priceRange / 10}%, #d3d3d3 ${priceRange / 10}%)`
              }}
            />
          </div>
        </div>
        <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center'>
          {allProducts.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .price-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          background: #d3d3d3;
          border-radius: 5px; /* Curve the ends */
          outline: none;
          opacity: 0.7;
          transition: opacity .2s;
        }

        .price-slider:hover {
          opacity: 1;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          background: #FF0000;
          cursor: pointer;
          border-radius: 50%; /* Make the thumb circular */
        }

        .price-slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: #FF0000;
          cursor: pointer;
          border-radius: 50%; /* Make the thumb circular */
        }
      `}</style>
    </div>
  )
}

export default Allsweatshirt