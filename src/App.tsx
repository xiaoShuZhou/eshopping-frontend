import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CreateProduct from './pages/CreateProduct'
import Header from './components/Header'
import Cart from './pages/Cart'
import UpdateProduct from './pages/UpdateProduct'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import CustomThemeProvider from './components/ThemeContext'

const App = () => {
  return (

    <CustomThemeProvider>
  <Header />
    <Routes>
    <Route path="/" element={<Products />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route path="/post" element={<CreateProduct />} />
    <Route path="/update-product/:productId" element={<UpdateProduct />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />

  </Routes>
  </CustomThemeProvider>

  )
}

export default App