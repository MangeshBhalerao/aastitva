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
    <div className='bg-[#1E1E1E] p-4 rounded-lg'>
      <h2 className='text-xl font-bold text-white mb-4'>Filters</h2>
      
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={activeFilters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 pl-10 focus:outline-none focus:border-[#D32F2F]"
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
      
      {/* Category Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-white mb-2'>Category</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <label key={category} className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
              <input
                type='radio'
                name='category'
                value={category}
                checked={activeFilters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className='form-radio text-[#D32F2F]'
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Design Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-white mb-2'>Design</h3>
        <div className='space-y-2'>
          {designs.map((design) => (
            <label key={design} className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
              <input
                type='checkbox'
                checked={activeFilters.design === design}
                onChange={(e) => handleFilterChange('design', e.target.value)}
                className='form-checkbox text-[#D32F2F]'
              />
              <span>{design}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-white mb-2'>Price Range</h3>
        <div className='space-y-2'>
          <label className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
            <input
              type='radio'
              name='priceRange'
              value='all'
              checked={activeFilters.priceRange === ''}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className='form-radio text-[#D32F2F]'
            />
            <span>All Prices</span>
          </label>
          <label className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
            <input
              type='radio'
              name='priceRange'
              value='under500'
              checked={activeFilters.priceRange === '0-500'}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className='form-radio text-[#D32F2F]'
            />
            <span>Under ₹500</span>
          </label>
          <label className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
            <input
              type='radio'
              name='priceRange'
              value='500to1000'
              checked={activeFilters.priceRange === '500-1000'}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className='form-radio text-[#D32F2F]'
            />
            <span>₹500 - ₹1000</span>
          </label>
          <label className='flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer'>
            <input
              type='radio'
              name='priceRange'
              value='over1000'
              checked={activeFilters.priceRange === '1000-999999'}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className='form-radio text-[#D32F2F]'
            />
            <span>Over ₹1000</span>
          </label>
        </div>
      </div>

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
                  className="text-[#D32F2F] rounded-full focus:ring-[#D32F2F]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className='w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-sm transition-colors'
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter; 