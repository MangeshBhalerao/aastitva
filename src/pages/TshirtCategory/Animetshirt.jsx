import React from 'react'
import Tshirtproducts from '../../data/Tshirtproducts'

function Alltshirt() {
  const allProducts = Tshirtproducts.filter(product => product.design === 'Anime')

  return (
    <div className='w-full min-h-screen bg-[#500303] text-white p-4' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h1 className='text-5xl text-center text-white font-thin mb-8'>Anime T-shirt</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center'>
        {allProducts.map((product, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alltshirt