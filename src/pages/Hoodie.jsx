import React from 'react'

function Hoodie() {
  return (
    <div className='bg-[#500303] text-white' style={{ 
      backgroundImage: 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzZ2dXkxY2ZhOHliZzhycmc5ZTgwZ3MwemhreGozY2E0amptb3ZmNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnsbC3jy9dfAFcA8VW/giphy.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backdropAttachment: 'fixed',
    }}>
      
      {/* Hero Section */}
      <div className='bg-cover bg-center h-[10vh] flex items-center justify-center'>
        <h1 className='text-5xl font-bold'>HOODIES</h1>
      </div>

      {/* Product Details Section */}
      <div className='max-w-7xl mx-auto p-8'>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
          
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
          <div className='bg-black p-4 rounded-lg'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              <img className='w-full h-full object-cover rounded-lg mb-4' src='https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1729486785' alt='Hoodie 1' />
            </div>
            <h3 className='text-xl mb-2'>Hoodie 1</h3>
            <p className='text-lg'>Price: ₹600</p>
          </div>
        
        
        </div>
      </div>
    </div>
  )
}

export default Hoodie