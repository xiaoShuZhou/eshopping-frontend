import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { createProduct } from '../redux/slices/productSlice';
import { Button, TextField, Typography, Container, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../misc/uploadFileService';
import { useAppSelector } from '../redux/hooks';

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    description: '',
    category: '', // Adjust based on your category structure
    image: 'https://example.com/default-image.jpg', // Default image URL
  });

  const categories = useAppSelector((state) => state.category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const file = files[0];
        const imageUrl = await uploadImage(file);
        setNewProduct({ ...newProduct, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.category || !newProduct.image) {
      window.alert('Please fill in all fields before creating a product.');
      return;
    }
    console.log('Creating product:', newProduct);
    dispatch(createProduct(newProduct));
    setNewProduct({
      title: '',
      price: 0,
      description: '',
      category: '',
      image: 'https://example.com/default-image.jpg',
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
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={newProduct.title}
              onChange={handleChange}
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                label = "Category"
                value={newProduct.category}
                onChange={(e) =>setNewProduct({ ...newProduct, category: e.target.value })}
                required
                variant="outlined"
              >
                <MenuItem value="">
                </MenuItem>
                {categories.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Create Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProduct;
