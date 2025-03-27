import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hoodieproducts from '../../data/Hoodieproducts';
import Sweatshirtproducts from '../../data/Sweatshirtproducts';
import Tshirtproducts from '../../data/Tshirtproducts';

function Search({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  
  // Combine all products
  const allProducts = [...Hoodieproducts, ...Sweatshirtproducts, ...Tshirtproducts];
  
  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.design && product.design.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setSearchResults(results);
  }, [searchTerm]);
  
  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
      <div 
        ref={searchRef}
        className="bg-[#0E0000] border border-gray-800 w-full max-w-3xl mx-4 rounded-lg shadow-2xl overflow-hidden"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        <div className="relative">
          <input 
            id="search-input"
            type="text" 
            placeholder="Search for products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 bg-[#0E0000] text-white text-xl focus:outline-none"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {searchResults.map((product) => (
                <Link 
                  key={`${product.category}-${product.id}`}
                  to={`/${product.category.toLowerCase()}/all`} 
                  onClick={onClose}
                  className="flex items-center bg-black p-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg text-white">{product.title}</h4>
                    <p className="text-gray-400">{product.category}</p>
                    <p className="text-[#AD2A2A]">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm.trim() !== '' ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-2xl">No products found</p>
              <p className="mt-2">Try a different search term or browse our categories</p>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p className="text-xl">Type to search for products</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Link 
                  to="/hoodie/all" 
                  onClick={onClose}
                  className="p-2 bg-[#1A1A1A] rounded hover:bg-[#AD2A2A] transition-colors"
                >
                  Hoodies
                </Link>
                <Link 
                  to="/sweatshirt/all" 
                  onClick={onClose}
                  className="p-2 bg-[#1A1A1A] rounded hover:bg-[#AD2A2A] transition-colors"
                >
                  Sweatshirts
                </Link>
                <Link 
                  to="/tshirt/all" 
                  onClick={onClose}
                  className="p-2 bg-[#1A1A1A] rounded hover:bg-[#AD2A2A] transition-colors"
                >
                  T-shirts
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search; 