import React, { useState } from 'react'
import Sweatshirtproducts from '../../data/Sweatshirtproducts'
import ProductCard from '../../components/Card/ProductCard'
import Filter from '../../components/Card/Filter'

function Allsweatshirt() {
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price
  const [sortOrder, setSortOrder] = useState('lowToHigh') // Default sort order

  const filteredProducts = priceRange === 1000 
    ? Sweatshirtproducts.filter(product => product.category === 'Sweatshirt')
    : Sweatshirtproducts.filter(product => product.category === 'Sweatshirt' && product.price <= priceRange)

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  const addToCart = (product) => {
    // Add product to cart logic here
    console.log(`Added ${product.title} to cart`)
  }

  return (
    <div className='w-full min-h-screen bg-[#0D0D0D] text-white p-4 pt-24' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='flex'>
        <Filter priceRange={priceRange} setPriceRange={setPriceRange} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center'>
          {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allsweatshirt