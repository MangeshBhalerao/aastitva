import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Login from './Card/Login';
import { CartContext } from './Card/Cart';
import loginIcon from '../assets/user-interface.png'; // Adjust the path as necessary

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the visibility of the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to manage the visibility of the login modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // Context to get the cart items
  const { cart } = useContext(CartContext);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle the login modal
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 right-0 bg-[#0E0000] bg-opacity-80 backdrop-blur-sm text-2xl w-full h-20 text-white flex justify-between items-center border-b z-20' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        {/* Logo */}
        <RouterLink to="/" className='m-4 ' style={{ fontFamily: 'Yatra One, sans-serif' }}>अस्तित्व</RouterLink>

        {/* Desktop Menu */}
        <div className='hidden md:flex justify-center items-center space-x-4 m-8 relative z-10'>
          <RouterLink to="/" className='hover:cursor-pointer hover:underline'>Home</RouterLink>
          <div className='relative z-20'>
            {/* Categories Dropdown */}
            <button onClick={toggleDropdown} className='hover:cursor-pointer hover:underline text-[#AD2A2A]' style={{ zIndex: 20 }}>
              CATEGORIES
            </button>
            {isDropdownOpen && (
              <div className='absolute bg-[#0E0000] text-white mt-2 rounded shadow-lg z-900'>
                <RouterLink to="/hoodie/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleDropdown}>Hoodie</RouterLink>
                <RouterLink to="/sweatshirt/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleDropdown}>Sweatshirt</RouterLink>
                <RouterLink to="/tshirt/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleDropdown}>Tshirt</RouterLink>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>Contact</ScrollLink>
        </div>

        {/* Desktop Cart and Login */}
        <div className='hidden md:flex items-center space-x-4 m-8 relative z-10'>
          {cart.length > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='w-10 h-10' fill='currentColor' stroke='currentColor'>
                <path className="cls-1" d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z"/><circle className="cls-1" cx="14" cy="26" r="2"/><circle className="cls-1" cx="24" cy="26" r="2"/>
              </svg>
              <span className='absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cart.length}</span>
            </RouterLink>
          )}
          <img src={loginIcon} alt="Login" className='w-8 h-8 cursor-pointer' onClick={toggleLogin} />
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center space-x-4 m-4 relative z-20'>
          {cart.length > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='w-10 h-10' fill='currentColor' stroke='currentColor'>
                <path className="cls-1" d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z"/><circle className="cls-1" cx="14" cy="26" r="2"/><circle className="cls-1" cx="24" cy="26" r="2"/>
              </svg>
              <span className='absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cart.length}</span>
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
              <div className='absolute text-2xl text-white  w-full text-center'>
                <RouterLink to="/hoodie/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleMenu}>Hoodie</RouterLink>
                <RouterLink to="/sweatshirt/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleMenu}>Sweatshirt</RouterLink>
                <RouterLink to="/tshirt/all" className='block px-4 py-2 hover:bg-[#822F2F] rounded' onClick={toggleMenu}>Tshirt</RouterLink>
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
    </div>
  );
}