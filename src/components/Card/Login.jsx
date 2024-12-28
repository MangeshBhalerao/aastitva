import React from 'react'

function Login({ onClose }) {
  return (
    <div className="fixed inset-0 flex text-white items-center justify-center bg-black bg-opacity-50 z-50" style={{ 
        fontFamily: 'Bebas Neue, sans-serif'
    
        }}>
      
      <div className="bg-[#800E13] p-8 rounded-lg shadow-lg w-80 ring-1 ring-[#bbb9b9] md:w-1/3">
        <h2 className="text-4xl mb-4" style={{
        }}>Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-2xl mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-2xl mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#38040E] hover:bg-[#250902] text-white text-2xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <button
              className="inline-block align-baseline text-2xl hover:text-[#38040E]"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login