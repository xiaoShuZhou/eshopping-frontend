import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProductsWithFilters } from '../redux/slices/productSlice';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FilterParams } from '../types/product';

const Filter = () => {
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const categories = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  const handleFilters = () => {
    // Only include values in the payload if they are not empty.
    const filters:FilterParams = {};
    if (title) filters.title = title;
    if (priceMin) filters.priceMin = Number(priceMin);
    if (priceMax) filters.priceMax = Number(priceMax);
    if (categoryId) filters.categoryId = categoryId;

    dispatch(getProductsWithFilters(filters));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 2,
      '& .MuiTextField-root, & .MuiButton-root, & .MuiFormControl-root': {
        borderRadius: '20px',
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
      },
    }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} size="small" sx={{ flex: 1 }} />
      <TextField label="Price Min" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} size="small" sx={{ flex: 1 }} />
      <TextField label="Price Max" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} size="small" sx={{ flex: 1 }} />
      <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select labelId="category-select-label" id="category-select" value={categoryId} label="Category" onChange={(e) => setCategoryId(e.target.value)}>
          <MenuItem value=""><em>None</em></MenuItem>
          {categories.categories.map(category => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleFilters} sx={{ py: 1 }}>Apply Filters</Button>
    </Box>
  );
};

export default Filter;
