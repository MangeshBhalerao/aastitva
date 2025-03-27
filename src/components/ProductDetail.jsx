import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import Hoodieproducts from '../data/Hoodieproducts';
import Sweatshirtproducts from '../data/Sweatshirtproducts';
import Tshirtproducts from '../data/Tshirtproducts';

function ProductDetail() {
  const { productId, category } = useParams();
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  
  // Available sizes for clothing
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  // Available colors (you can customize based on your inventory)
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Grey', value: '#808080' }
  ];
  
  // Find the product based on category and ID
  useEffect(() => {
    setLoading(true);
    let foundProduct = null;
    
    // Convert productId to number for comparison
    const id = parseInt(productId);
    
    if (category === 'hoodie') {
      foundProduct = Hoodieproducts.find(p => p.id === id);
    } else if (category === 'sweatshirt') {
      foundProduct = Sweatshirtproducts.find(p => p.id === id);
    } else if (category === 'tshirt') {
      foundProduct = Tshirtproducts.find(p => p.id === id);
    }
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      // Set default selections
      setSelectedSize('M');
      setSelectedColor(colors[0]);
    }
    
    setLoading(false);
  }, [productId, category]);
  
  // Handle toggle wishlist
  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  // Check if product is in wishlist - calculated directly from context
  const inWishlist = product ? isInWishlist(product.id) : false;
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0D0D0D] text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0D0D0D] text-white p-4">
        <h2 className="text-3xl mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#AD2A2A] hover:bg-[#8B0000] text-white px-6 py-2 rounded transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  // Handle adding to cart with selected options
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    
    // Create a new product object with the selected options
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor: selectedColor.name,
      quantity
    };
    
    addToCart(product, selectedSize, selectedColor.name, quantity);
    
    // Optional: Show confirmation or navigate to cart
    const confirmAdd = window.confirm('Product added to cart. View cart now?');
    if (confirmAdd) {
      navigate('/cart');
    }
  };
  
  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/buy');
  };
  
  // Product images (main image + additional views)
  // In a real application, each product would have multiple images
  const productImages = [
    { url: product.image, alt: `${product.title} main view` },
    { url: product.image, alt: `${product.title} back view` },
    { url: product.image, alt: `${product.title} side view` }
  ];
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24 pb-12" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Product Images */}
          <div className="md:flex-1 px-4 mb-8 md:mb-0">
            <div className="h-96 md:h-[32rem] rounded-lg bg-black mb-4 overflow-hidden relative">
              {/* Image with lazy loading */}
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
              
              {/* Wishlist button */}
              <button
                onClick={handleToggleWishlist}
                className={`absolute top-4 right-4 p-2.5 rounded-full z-20 transition-all duration-300 ${
                  inWishlist 
                    ? 'bg-[#AD2A2A] text-white' 
                    : 'bg-black bg-opacity-70 text-white hover:bg-[#AD2A2A]'
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill={inWishlist ? "currentColor" : "none"} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>
            </div>
            
            <div className="flex -mx-2 mb-4">
              {productImages.map((image, i) => (
                <div 
                  key={i}
                  className={`w-1/3 px-2 cursor-pointer ${mainImage === image.url ? 'ring-2 ring-[#AD2A2A]' : ''}`}
                  onClick={() => setMainImage(image.url)}
                >
                  <div className="h-24 rounded-lg bg-gray-900 mb-4 overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:flex-1 px-4">
            <div className="mb-2 text-sm">
              <span className="bg-[#AD2A2A] text-white px-2 py-1 rounded">{product.category}</span>
              {product.design && (
                <span className="ml-2 bg-gray-800 text-white px-2 py-1 rounded">{product.design}</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold mb-2 text-[#FF0000]">{product.title}</h2>
              
              {/* Wishlist button for mobile */}
              <button
                onClick={handleToggleWishlist}
                className={`md:hidden p-2.5 rounded-full z-20 transition-all duration-300 ${
                  inWishlist 
                    ? 'bg-[#AD2A2A] text-white' 
                    : 'bg-black bg-opacity-70 text-white hover:bg-[#AD2A2A]'
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill={inWishlist ? "currentColor" : "none"} 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>
            </div>
            
            <p className="text-3xl mb-6">₹{product.price}</p>
            
            <div className="mb-6">
              <p className="text-lg text-gray-300 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-xl mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-sm ${
                      selectedSize === size 
                        ? 'bg-[#AD2A2A] text-white' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    } transition-colors`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-xl mb-2">Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor && selectedColor.name === color.name 
                        ? 'border-[#AD2A2A]' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name} color`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-xl mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="bg-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-700 transition-colors"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="bg-gray-900 px-4 py-1 text-center">
                  {quantity}
                </span>
                <button 
                  className="bg-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-700 transition-colors"
                  onClick={() => setQuantity(prev => prev + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleAddToCart}
                className="bg-[#AD2A2A] hover:bg-[#8B0000] transition-colors px-6 py-3 text-white text-lg rounded-sm flex-1"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="bg-black hover:bg-gray-900 transition-colors border border-white px-6 py-3 text-white text-lg rounded-sm flex-1"
              >
                Buy Now
              </button>
            </div>
            
            {/* Wishlist Button (standalone) */}
            <button 
              onClick={handleToggleWishlist}
              className={`mt-4 w-full py-3 border rounded-sm flex items-center justify-center gap-2 transition-colors ${
                inWishlist 
                  ? 'bg-[#AD2A2A] border-[#AD2A2A] text-white' 
                  : 'bg-transparent border-white text-white hover:bg-gray-900'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={inWishlist ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            
            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-800 pt-8">
              <h3 className="text-xl mb-4">Product Details</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Premium quality material</li>
                <li>Comfortable fit</li>
                <li>Machine washable</li>
                <li>Made in India</li>
                <li>Free shipping on orders above ₹500</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 