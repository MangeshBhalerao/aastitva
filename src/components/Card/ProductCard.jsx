import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className='relative max-w-sm py-2 rounded overflow-hidden shadow-lg bg-[#0D0D0D] text-white m-4'>
      <div className='absolute top-0 left-0 w-full h-64 overflow-hidden z-10'>
        <img className='w-full h-full object-cover' src={product.image} alt={product.title} />
      </div>
      <div className='relative pt-64 px-6 py-4 z-20'>
        <div className='text-3xl mb-2 text-[#FF0000]'>{product.title}</div>
        <p className='text-base'>
          {product.description}
        </p>
      </div>
      <div className='px-6 pt-4 pb-2 flex justify-between items-center mb-2 z-20'>
        <span className='inline-block bg-[#8B0000] rounded-full px-3 py-1 text-2xl text-white'>₹{product.price}</span>
        <button 
          className='bg-[#FF0000] px-3 py-1 rounded-full text-2xl text-white'
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
  )
}

export default ProductCard