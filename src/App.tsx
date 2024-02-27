import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CreateProduct from './pages/CreateProduct'
import Header from './components/Header'

const App = () => {
  return (
  <div>
  <Header />
    <Routes>
    <Route path="/" element={<Products />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route path="/post" element={<CreateProduct />} />
  </Routes>
  </div>
  )
}

export default App