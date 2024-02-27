import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProducts } from '../redux/slices/productSlice';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../misc/uploadFileService';


const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={getImageUrl(product.images[0])}
              alt={product.title}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
