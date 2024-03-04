import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProducts } from '../redux/slices/productSlice';
import { getCategories } from '../redux/slices/categorySlice';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../misc/uploadFileService';
import { useState } from 'react';
import  Filter from '../components/Filter';
import Pagination from '../components/Pagination';


const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
    
    <Grid container spacing={2}>
    <Filter />
      {currentItems.map((product) => (
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
    <Pagination 
        totalItems={products.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Products;
