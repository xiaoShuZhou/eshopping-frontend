import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProducts } from '../redux/slices/productSlice';
import { getCategories } from '../redux/slices/categorySlice';
import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>Error: {error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Filter />
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={10}>
            <Grid container spacing={4}>
              {currentItems.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 200, objectFit: 'cover' }}
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {product.category.name}
                      </Typography>
                      <Typography variant="body1" component="p">
                        ${product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" component={Link} to={`/product/${product.id}`} sx={{ mb: 2 }}>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
