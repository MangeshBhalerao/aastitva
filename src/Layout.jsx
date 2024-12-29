import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Content from './components/Content'
import BestSelling from './components/Card/BestSelling'
import Tshirt from './pages/Tshirt'
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

function Layout() {
  const location = useLocation()

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/tshirt" element={<Tshirt />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/hoodie/all" element={<Allhoodie products={Hoodieproducts} />} />
          <Route path="/hoodie/car" element={<Carhoodie products={Hoodieproducts} />} />
          <Route path="/hoodie/anime" element={<Animehoodie products={Hoodieproducts} />} />
          <Route path="/sweatshirt/all" element={<Allsweatshirt products={Sweatshirtproducts} />} />
          <Route path="/sweatshirt/car" element={<Carsweatshirt products={Sweatshirtproducts} />} />
          <Route path="/sweatshirt/anime" element={<Animesweatshirt products={Sweatshirtproducts} />} />
        </Routes>
        {location.pathname !== '/hoodie' && location.pathname !== '/sweatshirt' && location.pathname !== '/tshirt' && location.pathname !== '/cart' && location.pathname !== '/hoodie/all' && location.pathname !== '/hoodie/car' && location.pathname !== '/hoodie/anime' && location.pathname !== '/sweatshirt/all' && location.pathname !== '/sweatshirt/car' && location.pathname !== '/sweatshirt/anime' && <BestSelling products={Hoodieproducts} />}
        <Footer />
      </div>
    </CartProvider>
  )
}

export default Layout