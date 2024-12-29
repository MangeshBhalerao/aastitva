import React, { useState, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import Login from './Card/Login'
import { CartContext } from './Card/Cart'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false)
  const [isSweatshirtDropdownOpen, setIsSweatshirtDropdownOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { cart } = useContext(CartContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleSubDropdown = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen)
  }

  const toggleSweatshirtDropdown = () => {
    setIsSweatshirtDropdownOpen(!isSweatshirtDropdownOpen)
  }

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <div>
      <nav className='bg-[#0E0000] text-2xl w-full h-20 text-white flex justify-between items-center border-b' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        <RouterLink to="/" className='m-8' style={{ fontFamily: 'Yatra One, sans-serif' }}>अस्तित्व</RouterLink>
        <div className='hidden md:flex justify-center items-center space-x-4 m-8'>
          <RouterLink to="/" className='hover:cursor-pointer hover:underline'>Home</RouterLink>
          <div className='relative'>
            <button onClick={toggleDropdown} className='hover:cursor-pointer hover:underline text-[#AD2A2A]'>
              CATEGORIES
            </button>
            {isDropdownOpen && (
              <div className='absolute bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                <div className='relative'>
                  <button onClick={toggleSubDropdown} className='block px-4 py-2 hover:bg-[#822F2F] w-full text-left'>Hoodie</button>
                  {isSubDropdownOpen && (
                    <div className='absolute left-full top-0 bg-[#822F2F] text-white mt-2 rounded shadow-lg'>
                      <RouterLink to="/hoodie/all" className='block px-4 py-2 hover:bg-[#0c0c0c]' onClick={toggleSubDropdown}>All</RouterLink>
                      <RouterLink to="/hoodie/car" className='block px-4 py-2 hover:bg-[#1a1a1a]' onClick={toggleSubDropdown}>Car</RouterLink>
                      <RouterLink to="/hoodie/anime" className='block px-4 py-2 hover:bg-[#1a1a1a]' onClick={toggleSubDropdown}>Anime</RouterLink>
                    </div>
                  )}
                </div>
                <div className='relative'>
                  <button onClick={toggleSweatshirtDropdown} className='block px-4 py-2 hover:bg-[#822F2F] w-full text-left'>Sweatshirt</button>
                  {isSweatshirtDropdownOpen && (
                    <div className='absolute left-full top-0 bg-[#822F2F] text-white mt-2 rounded shadow-lg'>
                      <RouterLink to="/sweatshirt/all" className='block px-4 py-2 hover:bg-[#0c0c0c]' onClick={toggleSweatshirtDropdown}>All</RouterLink>
                      <RouterLink to="/sweatshirt/car" className='block px-4 py-2 hover:bg-[#1a1a1a]' onClick={toggleSweatshirtDropdown}>Car</RouterLink>
                      <RouterLink to="/sweatshirt/anime" className='block px-4 py-2 hover:bg-[#1a1a1a]' onClick={toggleSweatshirtDropdown}>Anime</RouterLink>
                    </div>
                  )}
                </div>
                <RouterLink to="/tshirt/all" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Tshirt</RouterLink>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:underline'>Contact</ScrollLink>
        </div>
        <div className='hidden md:flex items-center space-x-4 m-8'>
          {cart.length > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='w-10 h-10' fill='currentColor' stroke='currentColor'>
                <path className="cls-1" d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z"/><circle className="cls-1" cx="14" cy="26" r="2"/><circle className="cls-1" cx="24" cy="26" r="2"/>
              </svg>
              <span className='absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cart.length}</span>
            </RouterLink>
          )}
          <button className='bg-[#AD2A2A] px-2 py-1 rounded-lg hover:bg-[#822F2F]' onClick={toggleLogin}>LOGIN</button>
        </div>
        <div className='md:hidden flex items-center space-x-4 m-8'>
          {cart.length > 0 && (
            <RouterLink to="/cart" className='relative hover:cursor-pointer hover:underline' style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='w-10 h-10' fill='currentColor' stroke='currentColor'>
                <path className="cls-1" d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z"/><circle className="cls-1" cx="14" cy="26" r="2"/><circle className="cls-1" cx="24" cy="26" r="2"/>
              </svg>
              <span className='absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>{cart.length}</span>
            </RouterLink>
          )}
          <button className='bg-[#AD2A2A] px-2 py-1 rounded-lg hover:bg-[#822F2F]' onClick={toggleLogin}>LOGIN</button>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='md:hidden bg-[#0E0000] text-white flex flex-col text-xl items-center space-y-4 py-4 fixed top-0 right-0 h-full w-64 z-50'
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          <button onClick={toggleMenu} className='self-end p-4'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
            </svg>
          </button>
          <RouterLink to="/" className='hover:cursor-pointer hover:bg-[#822F2F] px-4 py-2 rounded' onClick={toggleMenu}>Home</RouterLink>
          <div className='relative'>
            <button onClick={toggleDropdown} className='hover:cursor-pointer hover:bg-[#822F2F] px-4 py-2 rounded'>
              CATEGORIES
            </button>
            {isDropdownOpen && (
              <div className='absolute bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                <div className='relative'>
                  <button onClick={toggleSubDropdown} className='block px-4 py-2 hover:bg-[#822F2F] w-full text-left'>Hoodie</button>
                  {isSubDropdownOpen && (
                    <div className='absolute left-full top-0 bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                      <RouterLink to="/hoodie/all" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSubDropdown}>All Hoodies</RouterLink>
                      <RouterLink to="/hoodie/car" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSubDropdown}>Car</RouterLink>
                      <RouterLink to="/hoodie/anime" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSubDropdown}>Anime</RouterLink>
                    </div>
                  )}
                </div>
                <div className='relative'>
                  <button onClick={toggleSweatshirtDropdown} className='block px-4 py-2 hover:bg-[#822F2F] w-full text-left'>Sweatshirt</button>
                  {isSweatshirtDropdownOpen && (
                    <div className='absolute left-full top-0 bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                      <RouterLink to="/sweatshirt/all" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSweatshirtDropdown}>All Sweatshirts</RouterLink>
                      <RouterLink to="/sweatshirt/car" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSweatshirtDropdown}>Car</RouterLink>
                      <RouterLink to="/sweatshirt/anime" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleSweatshirtDropdown}>Anime</RouterLink>
                    </div>
                  )}
                </div>
                <RouterLink to="/tshirt/all" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Tshirt</RouterLink>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:bg-[#822F2F] px-4 py-2 rounded' onClick={toggleMenu}>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer hover:bg-[#822F2F] px-4 py-2 rounded' onClick={toggleMenu}>Contact</ScrollLink>
        </div>
      )}
      {isLoginOpen && <Login onClose={toggleLogin} />}
    </div>
  )
}