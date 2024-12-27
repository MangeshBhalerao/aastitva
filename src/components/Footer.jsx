import React from 'react'

function Footer() {
  return (
    <div className='w-full h-full bg-[#822F2F] text-white p-8 md:p-12' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
        <div className='w-full md:w-1/2 mb-8 md:mb-0'>
          <h2 className='text-3xl mb-4 text-black'>About Us</h2>
          <p className='text-lg'>
            We are a fashion brand committed to bringing you the latest trends and styles. Our mission is to provide high-quality clothing that makes you look and feel great.
          </p>
        </div>
        
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <h2 className='text-3xl mb-4 text-black'>Contact Us</h2>
          <p className='text-lg'>Email: aastitva@gmail.com</p>
          <p className='text-lg'>Phone: +123 456 7890</p>
          <p className='text-lg'>Address: 123 Fashion Street, Style City, Country</p>
        </div>

        <div className='w-full md:w-1/3'>
          <h2 className='text-3xl mb-4 text-black'>Follow Us</h2>
          <p className='text-lg'>Stay connected with us on social media for the latest updates and promotions.</p>
          <a href='https://www.instagram.com/adarshhnairr/' className='text-lg text-white hover:text-gray-300'>Instagram</a>
          {/* Add social media icons here */}
        </div>
      </div>
    </div>
  )
}

export default Footer