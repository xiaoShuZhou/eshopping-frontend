import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Products />} />
  </Routes>
  )
}

export default App