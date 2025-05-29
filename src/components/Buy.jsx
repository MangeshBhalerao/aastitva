import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Buy() {
  const { cart, getCartSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card'
  });
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit order
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Move to confirmation step
    }, 2000);
  };

  // Handle order completion
  const handleOrderComplete = () => {
    clearCart();
    navigate('/');
  };

  // Calculate tax amount
  const subtotal = getCartSubtotal();
  const taxAmount = subtotal * 0.18;
  const total = subtotal + taxAmount;

  // If cart is empty, redirect to home
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white pt-28 flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <p className="mb-8">Add some products to your cart before checkout.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-6 py-3 rounded-sm transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-28 pb-12" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl mb-8 text-center">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#AD2A2A]' : 'bg-gray-700'}`}>1</div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#AD2A2A]' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#AD2A2A]' : 'bg-gray-700'}`}>2</div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#AD2A2A]' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#AD2A2A]' : 'bg-gray-700'}`}>3</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column - Order summary */}
          <div className="lg:w-1/2">
            <div className="bg-black bg-opacity-50 border border-gray-800 p-6 rounded-md">
              <h2 className="text-2xl mb-4 pb-3 border-b border-gray-800">Order Summary</h2>
              
              {/* Cart items */}
              <div className="max-h-80 overflow-y-auto mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex py-3 border-b border-gray-800">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded" 
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex text-sm text-gray-400 mt-1">
                        {item.size && <span className="mr-3">Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Qty: {item.quantity}</span>
                        <span className="text-[#FF0000]">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order totals */}
              <div className="space-y-2 py-4 border-t border-b border-gray-800 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping:</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax:</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Right column - Checkout form or confirmation */}
          <div className="lg:w-1/2">
            {step === 1 && (
              <div className="bg-black bg-opacity-50 border border-gray-800 p-6 rounded-md">
                <h2 className="text-2xl mb-6 pb-3 border-b border-gray-800">Shipping Information</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-gray-300">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-300">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-gray-300">City</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-300">State</label>
                      <input 
                        type="text" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                        className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-gray-300">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zipCode" 
                      value={formData.zipCode} 
                      onChange={handleChange}
                      className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-3 rounded-sm transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-black bg-opacity-50 border border-gray-800 p-6 rounded-md">
                <h2 className="text-2xl mb-6 pb-3 border-b border-gray-800">Payment Method</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="text-[#AD2A2A] focus:ring-[#AD2A2A]"
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="upi" 
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="text-[#AD2A2A] focus:ring-[#AD2A2A]"
                      />
                      <span>UPI</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="text-[#AD2A2A] focus:ring-[#AD2A2A]"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4 border-t border-gray-800 pt-4">
                      <div>
                        <label className="block mb-1 text-gray-300">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="XXXX XXXX XXXX XXXX" 
                          className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-gray-300">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-300">CVV</label>
                          <input 
                            type="text" 
                            placeholder="XXX" 
                            className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-gray-300">Name on Card</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        />
                      </div>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'upi' && (
                    <div className="space-y-4 mt-4 border-t border-gray-800 pt-4">
                      <div>
                        <label className="block mb-1 text-gray-300">UPI ID</label>
                        <input 
                          type="text" 
                          placeholder="yourname@upi" 
                          className="w-full p-2 rounded-sm bg-gray-800 border border-gray-700 focus:border-[#AD2A2A] focus:outline-none" 
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <button 
                      type="submit"
                      className="w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-3 rounded-sm transition-colors flex justify-center items-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : `Place Order - ₹${total.toFixed(2)}`}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full bg-transparent border border-gray-600 hover:border-white text-white py-3 rounded-sm transition-colors"
                    >
                      Back to Shipping
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 3 && (
              <div className="bg-black bg-opacity-50 border border-gray-800 p-6 rounded-md text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-3xl mb-3">Thank You for Your Order!</h2>
                <p className="text-gray-400 mb-6">Your order has been placed successfully.</p>
                
                <div className="text-left p-4 bg-gray-900 rounded-md mb-8">
                  <p className="border-b border-gray-800 pb-2 mb-2">
                    <span className="text-gray-400">Order Number:</span> 
                    <span className="float-right">ASTITVA-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </p>
                  <p className="border-b border-gray-800 pb-2 mb-2">
                    <span className="text-gray-400">Shipping Address:</span> 
                    <span className="float-right">{formData.address}</span>
                  </p>
                  <p className="border-b border-gray-800 pb-2 mb-2">
                    <span className="text-gray-400">Order Total:</span> 
                    <span className="float-right">₹{total.toFixed(2)}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Payment Method:</span> 
                    <span className="float-right">
                      {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                       formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                    </span>
              </p>
            </div>
                
              <button 
                  className="w-full bg-[#AD2A2A] hover:bg-[#8B0000] text-white py-3 rounded-sm transition-colors"
                  onClick={handleOrderComplete}
              >
                  Continue Shopping
                </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;