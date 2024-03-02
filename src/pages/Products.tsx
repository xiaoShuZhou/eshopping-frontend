import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProducts } from '../redux/slices/productSlice';
import { getCategories } from '../redux/slices/categorySlice';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../misc/uploadFileService';
import { useState } from 'react';


const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10; // Adjust based on your preference

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(getProducts({ offset, limit: itemsPerPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  

  return (
    <div>
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
                {product.category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage}>
        Next
      </button>
    </div>
    </div>
    
  );
};

export default Products;
