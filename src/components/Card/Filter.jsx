import React from 'react'

const Filter = ({ priceRange, setPriceRange }) => {
  return (
    <div className='w-1/4 p-4 bg-[#000000] rounded-lg mt-3' style={{ height: '100vh' }}>
      <h2 className='text-3xl mb-4 text-[#AD2A2A] border-b-2'>Filters</h2>
      <div className='mt-4'>
        <label htmlFor='priceRange' className='block text-2xl text-white mb-2'>Max Price: ₹{priceRange}</label>
        <input 
          type='range' 
          id='priceRange' 
          min='0' 
          max='999' 
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)} 
          className='w-full price-slider'
          style={{
            background: `linear-gradient(to right, #FF0000 ${priceRange / 10}%, #d3d3d3 ${priceRange / 10}%)`
          }}
        />
      </div>
      <style jsx>{`
        .price-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          background: #d3d3d3;
          border-radius: 5px; /* Curve the ends */
          outline: none;
          opacity: 0.7;
          transition: opacity .2s;
        }

        .price-slider:hover {
          opacity: 1;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          background: #FF0000;
          cursor: pointer;
          border-radius: 50%; /* Make the thumb circular */
        }

        .price-slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          background: #FF0000;
          cursor: pointer;
          border-radius: 50%; /* Make the thumb circular */
        }
      `}</style>
    </div>
  )
}

export default Filter