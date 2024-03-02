import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getProductsByTitle, getProductsByPriceRange, getProductsByCategory } from '../redux/slices/productSlice';
import { TextField, Button, Box } from '@mui/material';

const FilterComponent = () => {
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const dispatch = useAppDispatch();

  const handleTitleFilter = () => {
    dispatch(getProductsByTitle(title));
  };

  const handlePriceFilter = () => {
    const minPrice = Number(priceMin);
    const maxPrice = Number(priceMax);
  
    dispatch(getProductsByPriceRange({ price_min: minPrice, price_max: maxPrice }));
  };

  const handleCategoryFilter = () => {
    dispatch(getProductsByCategory(Number(categoryId)));
  };

  return (
    <Box>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button onClick={handleTitleFilter}>Filter by Title</Button>

      <TextField label="Price Min" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
      <TextField label="Price Max" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
      <Button onClick={handlePriceFilter}>Filter by Price</Button>

      <TextField label="Category ID" type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      <Button onClick={handleCategoryFilter}>Filter by Category</Button>
    </Box>
  );
};

export default FilterComponent;
