import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import Header from './components/Header';
import Cart from './pages/Cart';
import UpdateProduct from './pages/UpdateProduct';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CustomThemeProvider from './components/ThemeContext';
import { CssBaseline, Container, Box } from '@mui/material';

const App = () => {
  return (
    <CustomThemeProvider>
      <CssBaseline /> {/* Normalize the stylesheet */}
      <Header />
      <Container maxWidth="lg">
        <Box mt={4} mb={4}> {/* Add margin top and bottom for spacing */}
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/post" element={<CreateProduct />} />
            <Route path="/update-product/:productId" element={<UpdateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Container>
    </CustomThemeProvider>
  );
}

export default App;
