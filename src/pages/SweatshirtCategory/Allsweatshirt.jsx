import React, { useState, useEffect } from 'react'
import Sweatshirtproducts from '../../data/Sweatshirtproducts'
import ProductCard from '../../components/Card/ProductCard'
import ProductFilter from '../../components/ProductFilter'

function Allsweatshirt() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  
  // Extract unique categories and designs from products for filters
  const categories = [...new Set(Sweatshirtproducts.map(product => product.category))]
  const designs = [...new Set(Sweatshirtproducts.filter(product => product.design).map(product => product.design))]
  
  // Initialize filtered products with all Sweatshirt products
  useEffect(() => {
    setFilteredProducts(Sweatshirtproducts.filter(product => product.category === 'Sweatshirt'))
    setIsLoading(false)
  }, [])
  
  // Handle filter changes from the ProductFilter component
  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts)
  }

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    // Add product to cart logic here
    console.log(`Added ${product.title} to cart`)
  }

  // Function to handle buying a product now
  const buyNow = (product) => {
    // Buy now logic here
    console.log(`Buying ${product.title} now`)
  }

  return (
    <div className='w-full min-h-screen bg-[#0D0D0D] text-white p-2 sm:p-4 pt-28' style={{
      fontFamily: 'Bebas Neue, sans-serif',
      backgroundImage: 'url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVhNzJqODFjeWk5NmV0bDdzZTd5bGVydDRoMmxmOHA1eWN1YWk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6CwL9WAzz2GDde/giphy.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 1
    }}>
      {/* Mobile Filter Toggle Button */}
      <button 
        className='md:hidden bg-[#000000] bg-opacity-80 text-white text-xl py-2 px-4 rounded-md mb-4 flex items-center'
        onClick={() => setShowMobileFilter(!showMobileFilter)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className='flex flex-col md:flex-row gap-4'>
        {/* Filter Component (Hidden on mobile unless toggled) */}
        <div className={`${showMobileFilter ? 'block' : 'hidden'} md:block md:w-1/4`}>
          <ProductFilter 
            products={Sweatshirtproducts} 
            onFilterChange={handleFilterChange} 
            categories={categories}
            designs={designs}
            defaultCategory="Sweatshirt"
          />
        </div>

        <div className='flex-1'>
          {/* Product Count and Loading State */}
          <div className="mb-4 mt-20 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isLoading ? 'Loading products...' : `Sweatshirts (${filteredProducts.length})`}
            </h2>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse h-80">
                  <div className="h-40 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-2/3"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} addToCart={addToCart} buyNow={buyNow} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-60 bg-gray-900 bg-opacity-70 rounded-lg">
              <div className="text-center">
                <h3 className="text-xl mb-2">No products found</h3>
                <p className="text-gray-400">Try changing your filter settings</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Allsweatshirt