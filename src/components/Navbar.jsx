import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div>
      <nav className='bg-[#0E0000] text-2xl w-full h-20 text-white flex justify-between items-center border-b' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <h1 className='m-8' style={{ fontFamily: 'Yatra One, sans-serif' }}>अस्तित्व</h1>
        <div className='hidden md:flex justify-center items-center space-x-4 m-8'>
          <RouterLink to="/" className='hover:cursor-pointer hover:underline'>Home</RouterLink>
          <div className='relative'>
            <button onClick={toggleDropdown} className='hover:cursor-pointer hover:underline text-[#AD2A2A]'>
              CATEGORIES
            </button>
            {isDropdownOpen && (
              <div className='absolute bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                <RouterLink to="/hoodie" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Hoodie</RouterLink>
                <RouterLink to="/sweatshirt" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Sweatshirt</RouterLink>
                <RouterLink to="/tshirt" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Tshirt</RouterLink>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer'>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer'>Contact</ScrollLink>
          <button className='bg-[#AD2A2A] px-2 py-1 rounded-lg hover:bg-[#822F2F]'>LOGIN</button>
        </div>
        <div className='md:hidden flex items-center m-8'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='md:hidden bg-[#0E0000] text-white flex flex-col items-center space-y-4 py-4'>
          <RouterLink to="/" className='hover:cursor-pointer' onClick={toggleMenu}>Home</RouterLink>
          <div className='relative'>
            <button onClick={toggleDropdown} className='hover:cursor-pointer'>
              CATEGORIES
            </button>
            {isDropdownOpen && (
              <div className='absolute bg-[#0E0000] text-white mt-2 rounded shadow-lg'>
                <RouterLink to="/hoodie" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Hoodie</RouterLink>
                <RouterLink to="/sweatshirt" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Sweatshirt</RouterLink>
                <RouterLink to="/tshirt" className='block px-4 py-2 hover:bg-[#822F2F]' onClick={toggleDropdown}>Tshirt</RouterLink>
              </div>
            )}
          </div>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer' onClick={toggleMenu}>About</ScrollLink>
          <ScrollLink to="footer" smooth={true} duration={500} className='hover:cursor-pointer' onClick={toggleMenu}>Contact</ScrollLink>
          <button className='bg-[#AD2A2A] px-2 py-1 rounded-lg hover:bg-[#822F2F]' onClick={toggleMenu}>LOGIN</button>
        </div>
      )}
    </div>
  )
}