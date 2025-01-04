import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Content from './components/Content'
import BestSelling from './components/Card/BestSelling'
import Cart, { CartProvider } from './components/Card/Cart'
import Footer from './components/Footer'
import Carhoodie from './pages/HoodieCategory/Carhoodie'
import Allhoodie from './pages/HoodieCategory/Allhoodie'
import Animehoodie from './pages/HoodieCategory/Animehoodie'
import Allsweatshirt from './pages/SweatshirtCategory/Allsweatshirt'
import Animesweatshirt from './pages/SweatshirtCategory/Animesweatshirt'
import Carsweatshirt from './pages/SweatshirtCategory/Carsweatshirt'
import Hoodieproducts from './data/Hoodieproducts'
import Sweatshirtproducts from './data/Sweatshirtproducts'
import Tshirtproducts from './data/Tshirtproducts'
import Alltshirt from './pages/TshirtCategory/Alltshirt'
import Animetshirt from './pages/TshirtCategory/Animetshirt'
import Cartshirt from './pages/TshirtCategory/Cartshirt'
import Buy from './components/Buy'

function Layout() {
  const location = useLocation()

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/hoodie/all" element={<Allhoodie products={Hoodieproducts} />} />
          <Route path="/hoodie/car" element={<Carhoodie products={Hoodieproducts} />} />
          <Route path="/hoodie/anime" element={<Animehoodie products={Hoodieproducts} />} />
          <Route path="/sweatshirt/all" element={<Allsweatshirt products={Sweatshirtproducts} />} />
          <Route path="/sweatshirt/car" element={<Carsweatshirt products={Sweatshirtproducts} />} />
          <Route path="/sweatshirt/anime" element={<Animesweatshirt products={Sweatshirtproducts} />} />
          <Route path="/tshirt/all" element={<Alltshirt products={Tshirtproducts} />} />
          <Route path="/tshirt/car" element={<Cartshirt products={Tshirtproducts} />} />
          <Route path="/tshirt/anime" element={<Animetshirt products={Tshirtproducts} />} />
          <Route path='/buy' Component={Buy} />
        </Routes>
        {
        location.pathname !== '/cart' && 
        location.pathname !== '/hoodie/all' && 
        location.pathname !== '/hoodie/car' && 
        location.pathname !== '/hoodie/anime' && 
        location.pathname !== '/sweatshirt/all' && 
        location.pathname !== '/sweatshirt/car' && 
        location.pathname !== '/sweatshirt/anime' && 
        location.pathname !== '/tshirt/all' &&
        location.pathname !== '/tshirt/car' &&
        location.pathname !== '/tshirt/anime' &&
        location.pathname !== '/buy' &&
        <BestSelling products={Hoodieproducts} />}
        <Footer />
      </div>
    </CartProvider>
  )
}

export default Layout