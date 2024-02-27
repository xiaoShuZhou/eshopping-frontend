import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { Button, Grid, Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {getImageUrl } from '../misc/uploadFileService';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = () => {
    dispatch(emptyCart());
    window.alert("Successfully shopping!");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom align="center">
          Your Cart
        </Typography>
      </Grid>
      {cartItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography color="textSecondary">
                ${item.price} x {item.quantity}
              </Typography>
              <Typography variant="body2" component="p">
              <img src={getImageUrl(item.images[0])} alt={item.title} style={{width: '100px', height: '100px'}} />
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={() => handleIncreaseQuantity(item.id)} aria-label="increase">
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => handleDecreaseQuantity(item.id)} aria-label="decrease">
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleRemoveFromCart(item.id)} aria-label="remove">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h6" gutterBottom>
          Total Items: {totalItems}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Cart;
