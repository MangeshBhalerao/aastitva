import React, { useState } from 'react'
import Tshirtproducts from '../../data/Tshirtproducts'
import ProductCard from '../../components/Card/ProductCard'
import Filter from '../../components/Card/Filter'

function Alltshirt() {
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price

  const allProducts = priceRange === 1000 
    ? Tshirtproducts.filter(product => product.category === 'Tshirt')
    : Tshirtproducts.filter(product => product.category === 'Tshirt' && product.price <= priceRange)

  const addToCart = (product) => {
    // Add product to cart logic here
    console.log(`Added ${product.title} to cart`)
  }

  const buyNow = (product) => {
    // Buy now logic here
    console.log(`Buying ${product.title} now`)
  }

  return (
    <div className='w-full min-h-screen bg-[#0D0D0D] text-white p-4' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      <div className='flex'>
        <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
        <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center'>
          {allProducts.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} buyNow={buyNow} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Alltshirt