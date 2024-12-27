import React from 'react'

function Tshirt() {
  return (
    <div className='bg-[#500303] text-white' style={{ 
      backgroundImage: 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3hraG9uOWMwMmd2enpkdDZ6dHhoYnJpdWoyczk5eWw2Y3A1Mm1lciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lb2bPzqTnBxCmohyZN/giphy.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backdropAttachment: 'fixed',
    }}>
      
      {/* Hero Section */}
      <div className='bg-cover bg-center h-[10vh] flex items-center justify-center'>
        <h1 className='text-5xl font-bold '>TSHIRT</h1>
      </div>

      {/* Product Details Section */}
      <div className='max-w-7xl mx-auto p-8'>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F46%2Fb0%2F46b0d1e6ac96634e74bff2ff4d3c6189beaa48e9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F46%2Fb0%2F46b0d1e6ac96634e74bff2ff4d3c6189beaa48e9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F46%2Fb0%2F46b0d1e6ac96634e74bff2ff4d3c6189beaa48e9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
          
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F46%2Fb0%2F46b0d1e6ac96634e74bff2ff4d3c6189beaa48e9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F46%2Fb0%2F46b0d1e6ac96634e74bff2ff4d3c6189beaa48e9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
        
        </div>
      </div>
    </div>
  )
}

export default Tshirt