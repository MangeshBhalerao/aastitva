import React from 'react'
import { Route, Routes ,useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Content from './components/Content'
import Card from './components/Card/Card'
import Footer from './components/Footer'
import Hoodie from './pages/Hoodie'
import Sweatshirt from './pages/Sweatshirt'
import Tshirt from './pages/Tshirt'

const products = [
  {
    image: 'https://admin.kaufmannstatic.com/Images/191348_black_02-T20240826015415.jpg?i=191348_black_02-T20240826015415.jpg&w=850&h=850&bgcolor=f1f1f1',
    title: 'Product Title 1',
    description: 'This is a description of the product 1.',
    price: '600'
  },
  {
    image: 'https://admin.kaufmannstatic.com/Images/191348_black_02-T20240826015415.jpg?i=191348_black_02-T20240826015415.jpg&w=850&h=850&bgcolor=f1f1f1',
    title: 'Product Title 2',
    description: 'This is a description of the product 2.',
    price: '700'
  },
  {
    image: 'https://admin.kaufmannstatic.com/Images/191348_black_02-T20240826015415.jpg?i=191348_black_02-T20240826015415.jpg&w=850&h=850&bgcolor=f1f1f1',
    title: 'Product Title 3',
    description: 'This is a description of the product 3.',
    price: '800'
  }
]

function Layout() {
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/hoodie" element={<Hoodie />} />
        <Route path="/sweatshirt" element={<Sweatshirt />} />
        <Route path="/tshirt" element={<Tshirt />} />
      </Routes>
      {location.pathname !== '/hoodie' && location.pathname !== '/sweatshirt' && location.pathname !== '/tshirt' &&  <Card products={products} />}
      {/* <Card products={products} /> */}
      <Footer />
    </div>
  )
}

export default Layout