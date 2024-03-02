import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getProductsWithFilters } from '../redux/slices/productSlice'; // Adjust the import to your new thunk
import { TextField, Button, Box } from '@mui/material';

const Filter= () => {
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const dispatch = useAppDispatch();

  const handleFilters = () => {
    dispatch(getProductsWithFilters({ title, priceMin: Number(priceMin), priceMax: Number(priceMax), categoryId: Number(categoryId) }));
  };

  return (
    <Box>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Price Min" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
      <TextField label="Price Max" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
      <TextField label="Category ID" type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      <Button onClick={handleFilters}>Apply Filters</Button>
    </Box>
  );
};

export default Filter;
