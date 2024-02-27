// CreateProduct.tsx

import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { createProduct } from '../redux/slices/productSlice';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../misc/uploadFileService';

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    description: '',
    categoryId: 0, // Adjust based on your category structure
    images: ['https://example.com/default-image.jpg'], // Default image URL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const imageUrl = await uploadImage(files[0]);
        setNewProduct({ ...newProduct, images: [imageUrl] });
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle the error, e.g., show an error message
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProduct(newProduct));
    // Reset form and potentially show a success message
    setNewProduct({
      title: '',
      price: 0,
      description: '',
      categoryId: 0,
      images: ['https://example.com/default-image.jpg'],
    });
    window.alert("Product posted successfully!");
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Other fields */}
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={newProduct.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={newProduct.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="categoryId"
              label="Category ID"
              type="number"
              fullWidth
              value={newProduct.categoryId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="contained"
              color="primary"
            >
              Select Image
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Create Product
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProduct;
