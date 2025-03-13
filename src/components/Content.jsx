import React from 'react'

function Content() {
  return (
    <div 
      className='w-full h-screen flex flex-col justify-center items-center text-white'
      style={{
        backgroundImage: 'url(https://images6.alphacoders.com/318/thumb-1920-318320.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Bebas Neue, sans-serif',
        zIndex: 1
      }}
    >
      <div className='relative text-center p-4' style={{ zIndex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-8'>Welcome to the Home Page</h1>
        <p className='text-base sm:text-lg md:text-xl mt-4'>This is the home page content</p>
      </div>
    </div>
  )
}

export default Content