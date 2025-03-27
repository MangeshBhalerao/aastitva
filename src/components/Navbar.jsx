import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Login from './Card/Login';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Search from './Card/Search';
import loginIcon from '../assets/user-interface.png'; // Adjust the path as necessary

// Category data with images and icons
const categories = [
  {
    id: 'all',
    name: 'All Products',
    route: '/products/all',
    image: 'https://images.pexels.com/photos/5710224/pexels-photo-5710224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    id: 'hoodie',
    name: 'Hoodies',
    route: '/hoodie/all',
    image: 'https://t3.ftcdn.net/jpg/08/16/49/34/360_F_816493435_iXavwo9ibvVkQ9bThoQBU7lT71XoyzNF.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8v3a5 5 0 0 1-10 0V8" />
      </svg>
    )
  },
  {
    id: 'sweatshirt',
    name: 'Sweatshirts',
    route: '/sweatshirt/all',
    image: 'https://wallpapers.com/images/hd/aesthetic-clothes-12sc5o86h0e9xw1t.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 5c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2M7 7l-3 5 3 5M17 7l3 5-3 5M6 17h12c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1z" />
      </svg>
    )
  },
  {
    id: 'tshirt',
    name: 'T-Shirts',
    route: '/tshirt/all',
    image: 'https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 6a4 4 0 0 0-8 0M8 6h8l2 4-4 2m-4-2L2 10l2-4m8 6v8m-5-5h10" />
      </svg>
    )
  }
];

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the visibility of the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to track hover state
  const [hoverCategory, setHoverCategory] = useState(null);
  // State to manage the visibility of the login modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // State to manage the visibility of the search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Context to get the cart items
  const { cart, getCartItemCount } = useContext(CartContext);
  // Context to get the wishlist items
  const { wishlist, getWishlistCount } = useContext(WishlistContext);
  
  // Ref for dropdown menu for detecting clicks outside
  const dropdownRef = useRef(null);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Function to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to toggle the login modal
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Function to toggle the search modal
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Get cart and wishlist counts
  const cartCount = getCartItemCount();
  const wishlistCount = getWishlistCount();

  return (
    <div>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 right-0 bg-[#0E0000] bg-opacity-80 backdrop-blur-sm text-2xl w-full h-20 text-white flex justify-between items-center border-b z-20' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        {/* Logo */}
        <RouterLink to="/" className='m-4 ' style={{ fontFamily: 'Yatra One, sans-serif' }}>अस्तित्व</RouterLink>

        {/* Desktop Menu */}
        <div className='hidden md:flex justify-center items-center space-x-4 m-8 relative z-10'>
          <RouterLink to="/" className='hover:cursor-pointer hover:underline'>Home</RouterLink>
          <div className='relative z-20' ref={dropdownRef}>
            {/* Categories Dropdown */}
            <button 
              onClick={toggleDropdown}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className='flex items-center hover:cursor-pointer hover:text-[#FF0000] text-[#AD2A2A] transition-colors duration-300' 
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>CATEGORIES</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Enhanced dropdown menu */}
            {isDropdownOpen && (
              <div 
                className='absolute left-1/2 transform -translate-x-1/2 mt-2 w-[500px] rounded-md shadow-xl bg-[#0E0000] border border-gray-700 overflow-hidden'
                onMouseLeave={() => setIsDropdownOpen(false)}
                style={{
                  zIndex: 1000,
                  animation: 'fadeIn 0.2s ease-out',
                }}
              >
                <div className='flex'>
                  {/* Categories list on the left */}
                  <div className='w-2/5 border-r border-gray-700'>
                    {categories.map((category) => (
                      <RouterLink 
                        key={category.id}
                        to={category.route}
                        className='block'
                        onClick={() => setIsDropdownOpen(false)}
                        onMouseEnter={() => setHoverCategory(category.id)}
                      >
                        <div className={`flex items-center px-5 py-3 hover:bg-[#822F2F] transition-colors duration-200 ${hoverCategory === category.id ? 'bg-[#822F2F]' : ''}`}>
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                      </RouterLink>
                    ))}
                    
                    <div className='px-5 py-3 border-t border-gray-700'>
                      <RouterLink
                        to="/products/all"
                        className='flex items-center text-[#AD2A2A] hover:text-[#FF0000] transition-colors'
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span>View All Products</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </RouterLink>
                    </div>
                  </div>
                  
                  {/* Preview image on the right */}
                  <div className='w-3/5 bg-gray-900'>
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`h-full w-full absolute transition-opacity duration-300 ${
                          hoverCategory === category.id || (!hoverCategory && category.id === 'hoodie') 
                            ? 'opacity-100' 
                            : 'opacity-0'
                        }`}
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6'>
                          <h3 className='text-2xl font-bold mb-2'>Explore {category.name}</h3>
                          <p className='text-sm text-gray-300 mb-4'>Discover our latest {category.name.toLowerCase()} collection</p>
                          <RouterLink
                            to={category.route}
                            className='inline-block bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-5 py-2 rounded-sm transition-colors'
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Shop Now
                          </RouterLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>Contact</ScrollLink>
        </div>

        {/* Desktop Cart and Login */}
        <div className='hidden md:flex items-center space-x-4 m-8 relative z-10'>
          {/* Search Button */}
          <button 
            onClick={toggleSearch}
            className='text-white hover:text-gray-300'
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Wishlist Button */}
          <RouterLink to="/wishlist" className='relative hover:cursor-pointer hover:text-[#FF0000] transition-colors' aria-label="Wishlist">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7" 
              fill={wishlistCount > 0 ? '#AD2A2A' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            {wishlistCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{wishlistCount}</span>
            )}
          </RouterLink>

          {/* Cart Button */}
          {cartCount > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cartCount}</span>
            </RouterLink>
          )}
          <img src={loginIcon} alt="Login" className='w-8 h-8 cursor-pointer' onClick={toggleLogin} />
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center space-x-4 m-4 relative z-20'>
          {/* Mobile Search */}
          <button 
            onClick={toggleSearch}
            className='text-white'
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Wishlist */}
          <RouterLink to="/wishlist" className='relative hover:cursor-pointer' aria-label="Wishlist">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill={wishlistCount > 0 ? '#AD2A2A' : 'none'} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            {wishlistCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>{wishlistCount}</span>
            )}
          </RouterLink>

          {/* Mobile Cart */}
          {cartCount > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cartCount}</span>
            </RouterLink>
          )}
          <img src={loginIcon} alt="Login" className='w-7 h-7 cursor-pointer' onClick={toggleLogin} />
          <button onClick={toggleMenu} className='focus:outline-none'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-[#0E0000] text-white flex flex-col text-xl space-y-4 py-4 fixed top-0 right-0 h-full w-64 z-50 bg-opacity-80 backdrop-blur-xl' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          <div className='flex border-b justify-between '>
              <div className='hover:cursor-pointer text-[#8B0000] text-4xl text-center  p-3 ml-12 '>
                CATEGORIES
              </div>
            <button onClick={toggleMenu} className='self-end mb-6 mr-5'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
            </div>
          
          <div className='relative flex-grow'>
              <div className='absolute text-2xl text-white w-full'>
                {categories.map((category) => (
                  <RouterLink 
                    key={category.id}
                    to={category.route} 
                    className='flex items-center px-8 py-3 hover:bg-[#822F2F] rounded transition-colors' 
                    onClick={toggleMenu}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </RouterLink>
                ))}
              </div>  
          </div>
          <div className='mt-auto w-full border-t pt-5 text-2xl'>
            <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer px-4 py-4 ml-12' onClick={toggleMenu}>About</ScrollLink>
            <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer px-4 py-4 ' onClick={toggleMenu}>Contact</ScrollLink>
          </div>  
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && <Login onClose={toggleLogin} />}

      {/* Search Modal */}
      <Search isOpen={isSearchOpen} onClose={toggleSearch} />
      
      {/* Dropdown animation styles */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        `}
      </style>
    </div>
  );
}