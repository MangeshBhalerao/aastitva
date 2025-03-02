import React from 'react'

function Footer() {
  return (
    <div id='footer' className='border-white w-full h-full bg-[#000000] text-white p-8 md:p-12' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
        <div className='w-full md:w-1/2 mb-8 md:mb-0'>
          <h2 className='text-3xl  text-[#822F2F]'>About Us</h2>
          <p className='text-lg'>
            We are a fashion brand committed to bringing you the latest trends and styles. Our mission is to provide high-quality clothing that makes you look and feel great.
          </p>
        </div>
        
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <h2 className='text-3xl text-[#822F2F]'>Contact Us</h2>
          <p className='text-lg'>Email : aastitva@gmail.com</p>
        </div>

        <div className='w-full '>
          <h2 className='text-3xl mt-4 text-[#822F2F]'>Follow Us</h2>
          <p className='text-lg'>Stay connected with us on social media for the latest updates and promotions.</p>
          {/* Add social media icons here */}
          <a href='https://www.instagram.com/adarshhnairr/' className='text-2xl text-[#822F2F] hover:text-gray-300 hover:cursor-pointer'>🅾 Instagram</a>
        </div>
      </div>
    </div>
  )
}

export default Footer