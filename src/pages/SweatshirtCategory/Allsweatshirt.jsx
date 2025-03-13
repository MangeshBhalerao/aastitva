import React, { useState } from 'react'
import Sweatshirtproducts from '../../data/Sweatshirtproducts'
import ProductCard from '../../components/Card/ProductCard'
import Filter from '../../components/Card/Filter'

function Allsweatshirt() {
  // State to manage the maximum price for filtering products
  const [priceRange, setPriceRange] = useState(1000) // Assuming 1000 is the max price
  // State to manage the current sort order ('lowToHigh' or 'highToLow')
  const [sortOrder, setSortOrder] = useState('lowToHigh') // Default sort order
  // State to manage the visibility of the filter section
  const [showFilter, setShowFilter] = useState(false)

  // Filter products based on the selected price range
  const filteredProducts = priceRange === 1000 
    ? Sweatshirtproducts.filter(product => product.category === 'Sweatshirt')
    : Sweatshirtproducts.filter(product => product.category === 'Sweatshirt' && product.price <= priceRange)

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
    <div className='w-full min-h-screen bg-[#0D0D0D] text-white p-4 pt-24' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 1
    }}>
      {/* Filter Button for Mobile */}
      <button 
        className='md:hidden bg-[#000000] bg-opacity-70 text-white text-xl py-2 px-4 rounded-md ml-2'
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? 'Hide' : 'Filters'}
      </button>

      <div className='flex flex-col md:flex-row' style={{ zIndex: 10 }}>
        {/* Filter Component */}
        <div className={`w-full h-100 mt-2 md:w-1/4 lg:w-1/3 xl:w-1/4 bg-opacity-70 rounded-lg backdrop-blur-md ${showFilter ? 'block' : 'hidden'} md:block`} >
          <Filter priceRange={priceRange} setPriceRange={setPriceRange} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        {/* Product Grid */}
        <div className='w-full md:w-3/4 lg:w-4/5 xl:w-5/6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center'>
          {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allsweatshirt