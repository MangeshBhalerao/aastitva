import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hoodieproducts from '../../data/Hoodieproducts'

function Allhoodie() {
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price

  const filteredProducts = priceRange === 1000 
    ? Hoodieproducts.filter(product => product.category === 'Hoodie')
    : Hoodieproducts.filter(product => product.category === 'Hoodie' && product.price <= priceRange)

  return (
    <div className='w-full min-h-screen bg-[#500303] text-white p-4' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h1 className='text-5xl text-center text-white font-thin mb-8'>All Hoodies</h1>
      <div className='flex'>
        <div className='w-1/4 p-4 bg-gray-800 rounded-lg'>
          <h2 className='text-3xl mb-4'>Filter by Price</h2>
          <div className='mt-4'>
            <label htmlFor='priceRange' className='block text-white mb-2'>Max Price: ₹{priceRange}</label>
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
        <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center'>
          {filteredProducts.map((product, index) => (
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
                  onClick={() => addToCart(product)}
                >
                  Cart
                </button>
                <Link to={{ pathname: '/buy', state: { product } }}>
                  <button className='bg-white px-3 py-1 rounded-full text-2xl text-black ml-2'>
                    Buy
                  </button>
                </Link>
              </div>
            </div>
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

export default Allhoodie