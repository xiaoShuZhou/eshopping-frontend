// UpdateProduct.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProductDetail, updateProduct } from '../redux/slices/productSlice';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { uploadImage } from '../misc/uploadFileService';
import { UpdatedProduct } from '../types/product'

const UpdateProduct: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.category);
  const product = useAppSelector((state) =>
    state.product.products.find((p) => p.id === Number(productId))
  );

  const [updatedProduct, setUpdatedProduct] = useState<UpdatedProduct>({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [],
  });

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      });
    } else {
      dispatch(getProductDetail(Number(productId)));
    }
  }, [dispatch, productId, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const imageUrl = await uploadImage(files[0]);
        setUpdatedProduct({ ...updatedProduct, images: [imageUrl] }); 
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProduct({ id: Number(productId), updateData: updatedProduct }));
    alert('Product updated successfully!');
    navigate(`/product/${productId}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom component="div">
        Update Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={updatedProduct.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              value={updatedProduct.price}
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
              variant="outlined"
              value={updatedProduct.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="categoryId"
                value={updatedProduct.categoryId}
                label="Category"
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, categoryId: Number(e.target.value) })}
                required
              >
                <MenuItem value="">
                  <em>Select a Category</em>
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
              fullWidth
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateProduct;
