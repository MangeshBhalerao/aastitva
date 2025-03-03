import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'

function App() {

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
