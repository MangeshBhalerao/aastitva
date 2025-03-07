import React, { useState } from 'react'
import Hoodieproducts from '../../data/Hoodieproducts'
import ProductCard from '../../components/Card/ProductCard'
import Filter from '../../components/Card/Filter'

function Allhoodie() {
  // State to manage the maximum price for filtering products
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price
  // State to manage the current sort order ('lowToHigh' or 'highToLow')
  const [sortOrder, setSortOrder] = useState('lowToHigh') // Default sort order

  // Filter products based on the selected price range
  const filteredProducts = priceRange === 1000 
    ? Hoodieproducts.filter(product => product.category === 'Hoodie')
    : Hoodieproducts.filter(product => product.category === 'Hoodie' && product.price <= priceRange)

  // Sort the filtered products based on the selected sort order
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  // Function to handle adding a product to the cart
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
      zIndex: 1
    }}>
      <div className='flex' style={{ zIndex: 10 }}>
        {/* Filter Component */}
        <Filter priceRange={priceRange} setPriceRange={setPriceRange} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        {/* Product Grid */}
        <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center'>
          {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allhoodie