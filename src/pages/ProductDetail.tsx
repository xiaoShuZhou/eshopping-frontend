import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail, deleteProduct } from '../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getImageUrl } from '../misc/uploadFileService';
import { addToCart } from '../redux/slices/cartSlice';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const DetailContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  gap: theme.spacing(2),
}));

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const cartItems = useAppSelector((state) => state.cart.items);
  const userRole = useAppSelector((state) => state.user.user?.role);

  const product = products.find(p => p.id === Number(productId));
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(Number(productId)));
    }
    setIsInCart(cartItems.some(item => item.id === Number(productId)));
  }, [dispatch, productId, cartItems]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ item: { ...product, quantity: 1 } }));
      setIsInCart(true);
    }
  };

  const handleDeleteProduct = () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(Number(productId)));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">Error: {error}</Typography>;
  if (!product) return <Typography variant="body1">Product not found!</Typography>;

  return (
    <DetailContainer>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={getImageUrl(product.images[0])}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Typography variant="body2">
            {product.category.name}
          </Typography>
        </CardContent>
      </Card>
      <Box>
        {isInCart ? (
          <Button variant="contained" disabled>Item already added to cart</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
        )}
        {userRole === 'admin' && (
          <>
            <Button variant="outlined" color="error" onClick={handleDeleteProduct} sx={{ ml: 2 }}>Delete Product</Button>
            <Button variant="outlined" component={Link} to={`/update-product/${product.id}`} sx={{ ml: 2 }}>Update Product</Button>
          </>
        )}
      </Box>
    </DetailContainer>
  );
};

export default ProductDetail;
