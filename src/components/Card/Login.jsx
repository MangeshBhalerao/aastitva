import React from 'react'
import loginIcon from '../../assets/user-interface.png' // Adjust the path as necessary

function Login({ onClose }) {
  return (
    <div className="fixed inset-0 flex text-white items-center justify-center bg-black bg-opacity-50 z-50" style={{ 
        fontFamily: 'Bebas Neue, sans-serif'
        }}>
      <div className="bg-[#800E13] p-8 rounded-lg shadow-lg w-80 ring-1 ring-[#bbb9b9] md:w-1/3">
        <h2 className="text-4xl mb-4">Login</h2>
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
          <div className="mb-4">
            <label className="block text-2xl mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#AD2A2A] hover:bg-[#822F2F] text-2xl text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              <img src={loginIcon} alt="Login" className="w-6 h-6" />
            </button>
          </div>
        </form>
        <button
          className="mt-4 text-white underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Login