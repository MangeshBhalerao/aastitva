import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductFilter = ({ 
  products, 
  onFilterChange, 
  categories = [], 
  designs = [], 
  defaultCategory = '' 
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get('category') || defaultCategory,
    priceRange: searchParams.get('priceRange') || '',
    design: searchParams.get('design') || '',
    sortBy: searchParams.get('sortBy') || 'featured',
    searchQuery: searchParams.get('search') || '',
  });
  
  const [expanded, setExpanded] = useState({
    categories: true,
    priceRange: true,
    design: true,
    sort: true,
  });
  
  const [priceRanges] = useState([
    { label: 'All Prices', value: '' },
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Over ₹2000', value: '2000-999999' },
  ]);
  
  const [sortOptions] = useState([
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Name: A-Z', value: 'name_asc' },
    { label: 'Name: Z-A', value: 'name_desc' },
  ]);
  
  // Update URL params when filters change
  useEffect(() => {
    const newParams = {};
    
    if (activeFilters.category) newParams.category = activeFilters.category;
    if (activeFilters.priceRange) newParams.priceRange = activeFilters.priceRange;
    if (activeFilters.design) newParams.design = activeFilters.design;
    if (activeFilters.sortBy) newParams.sortBy = activeFilters.sortBy;
    if (activeFilters.searchQuery) newParams.search = activeFilters.searchQuery;
    
    setSearchParams(newParams);
    
    // Apply filters to products
    filterProducts();
  }, [activeFilters]);
  
  const filterProducts = () => {
    let filteredProducts = [...products];
    
    // Filter by category
    if (activeFilters.category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === activeFilters.category.toLowerCase()
      );
    }
    
    // Filter by design
    if (activeFilters.design) {
      filteredProducts = filteredProducts.filter(
        product => product.design && product.design.toLowerCase() === activeFilters.design.toLowerCase()
      );
    }
    
    // Filter by price range
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(
        product => product.price >= min && product.price <= max
      );
    }
    
    // Filter by search query
    if (activeFilters.searchQuery) {
      const query = activeFilters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // Sort products
    switch (activeFilters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        // Assuming products have a date field, otherwise fallback to default
        if (filteredProducts[0].date) {
          filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        break;
      default:
        // 'featured' - keep default order
        break;
    }
    
    onFilterChange(filteredProducts);
  };
  
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };
  
  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const clearFilters = () => {
    setActiveFilters({
      category: '',
      priceRange: '',
      design: '',
      sortBy: 'featured',
      searchQuery: '',
    });
  };
  
  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(val => val && val !== 'featured').length;
  
  return (
    <div className="bg-[#0D0D0D] text-white border border-gray-800 rounded-lg p-4 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>
      
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={activeFilters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 pl-10 focus:outline-none focus:border-[#AD2A2A]"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Categories filter */}
      <div className="mb-4 border-b border-gray-800 pb-4">
        <button 
          className="flex justify-between items-center w-full text-left mb-2"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="text-lg font-medium">Categories</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${expanded.categories ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expanded.categories && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="category" 
                value=""
                checked={activeFilters.category === ''}
                onChange={() => handleFilterChange('category', '')}
                className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
              />
              <span>All Categories</span>
            </label>
            
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value={category}
                  checked={activeFilters.category === category}
                  onChange={() => handleFilterChange('category', category)}
                  className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Price range filter */}
      <div className="mb-4 border-b border-gray-800 pb-4">
        <button 
          className="flex justify-between items-center w-full text-left mb-2"
          onClick={() => toggleSection('priceRange')}
        >
          <h3 className="text-lg font-medium">Price Range</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${expanded.priceRange ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expanded.priceRange && (
          <div className="mt-2 space-y-2">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="priceRange" 
                  value={range.value}
                  checked={activeFilters.priceRange === range.value}
                  onChange={() => handleFilterChange('priceRange', range.value)}
                  className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Design filter */}
      {designs.length > 0 && (
        <div className="mb-4 border-b border-gray-800 pb-4">
          <button 
            className="flex justify-between items-center w-full text-left mb-2"
            onClick={() => toggleSection('design')}
          >
            <h3 className="text-lg font-medium">Design</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform duration-300 ${expanded.design ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expanded.design && (
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="design" 
                  value=""
                  checked={activeFilters.design === ''}
                  onChange={() => handleFilterChange('design', '')}
                  className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
                />
                <span>All Designs</span>
              </label>
              
              {designs.map(design => (
                <label key={design} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="design" 
                    value={design}
                    checked={activeFilters.design === design}
                    onChange={() => handleFilterChange('design', design)}
                    className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
                  />
                  <span>{design}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Sort options */}
      <div className="mb-4">
        <button 
          className="flex justify-between items-center w-full text-left mb-2"
          onClick={() => toggleSection('sort')}
        >
          <h3 className="text-lg font-medium">Sort By</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${expanded.sort ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expanded.sort && (
          <div className="mt-2 space-y-2">
            {sortOptions.map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="sortBy" 
                  value={option.value}
                  checked={activeFilters.sortBy === option.value}
                  onChange={() => handleFilterChange('sortBy', option.value)}
                  className="text-[#AD2A2A] rounded-full focus:ring-[#AD2A2A]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Mobile view - filter button and drawer (simplified) */}
      <div className="md:hidden fixed bottom-4 right-4 z-30">
        <button 
          className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => document.getElementById('mobile-filters').classList.toggle('hidden')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
      
      <div id="mobile-filters" className="hidden md:hidden fixed inset-0 bg-black bg-opacity-75 z-40">
        <div className="bg-[#0D0D0D] h-full w-3/4 max-w-xs p-4 ml-auto overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={() => document.getElementById('mobile-filters').classList.add('hidden')}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Mobile filter content - simplified version of desktop filters */}
          {/* (simplified version would go here) */}
          
          <button 
            className="w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-3 rounded mt-6"
            onClick={() => document.getElementById('mobile-filters').classList.add('hidden')}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter; 