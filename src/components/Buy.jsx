import React from 'react'
import { useLocation } from 'react-router-dom'

function Buy() {
  const location = useLocation()
  const { product } = location.state || {}

  if (!product) {
    return <div>No product data available</div>
  }

  return (
    <div className='h-screen w-full bg-red-900 flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
        <p className='text-lg mb-2'>Price: ${product.price}</p>
        <p className='text-lg mb-4'>Description: {product.description}</p>
        <button className='bg-green-500 text-white px-4 py-2 rounded'>Proceed to Payment</button>
      </div>
    </div>
  )
}

export default Buy