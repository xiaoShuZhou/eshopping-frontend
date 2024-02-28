import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CreateProduct from './pages/CreateProduct'
import Header from './components/Header'
import Cart from './pages/Cart'
import UpdateProduct from './pages/UpdateProduct'

const App = () => {
  return (
  <div>
  <Header />
    <Routes>
    <Route path="/" element={<Products />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route path="/post" element={<CreateProduct />} />
    <Route path="/update-product/:productId" element={<UpdateProduct />} />
    <Route path="/cart" element={<Cart />} />

  </Routes>
  </div>
  )
}

export default App