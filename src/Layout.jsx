import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Content from './components/Content'
import BestSelling from './components/Card/BestSelling'
import Cart from './components/Card/Cart'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Wishlist from './components/Wishlist'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'

import Allhoodie from './pages/HoodieCategory/Allhoodie'
import Alltshirt from './pages/TshirtCategory/Alltshirt'

import Allsweatshirt from './pages/SweatshirtCategory/Allsweatshirt'

import Hoodieproducts from './data/Hoodieproducts'
import Sweatshirtproducts from './data/Sweatshirtproducts'
import Tshirtproducts from './data/Tshirtproducts'

import Buy from './components/Buy'

function Layout() {
  const location = useLocation()

  return (
    <WishlistProvider>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/hoodie/all" element={<Allhoodie products={Hoodieproducts} />} />
            <Route path="/sweatshirt/all" element={<Allsweatshirt products={Sweatshirtproducts} />} />
            <Route path="/tshirt/all" element={<Alltshirt products={Tshirtproducts} />} />
            <Route path="/product/:category/:productId" element={<ProductDetail />} />
            <Route path='/buy' Component={Buy} />
          </Routes>
          {
          location.pathname !== '/cart' && 
          location.pathname !== '/wishlist' &&
          location.pathname !== '/hoodie/all' && 
          location.pathname !== '/sweatshirt/all' && 
          location.pathname !== '/tshirt/all' &&
          location.pathname !== '/buy' &&
          !location.pathname.includes('/product/') &&
          <BestSelling products={Hoodieproducts} />}
          <Footer />
        </div>
      </CartProvider>
    </WishlistProvider>
  )
}

export default Layout