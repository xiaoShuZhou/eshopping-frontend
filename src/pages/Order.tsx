import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getOrdersByUserId, deleteOrder } from '../redux/slices/orderSlice';
import { Masonry } from '@mui/lab';
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress, Button } from '@mui/material';
import { RootState } from '../redux/store';
import { Order, OrderItem } from '../types/order';

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading: userLoading, error: userError } = useAppSelector((state: RootState) => state.user);
  const { orders, loading: ordersLoading, error: ordersError } = useAppSelector((state: RootState) => state.order);

  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUserId(user.id)).unwrap().catch((error) => {
        console.error('Failed to fetch orders:', error);
      });
    }
  }, [dispatch, user]);

  const handleDelete = (orderId: string) => {
    dispatch(deleteOrder(orderId)).unwrap().catch((error) => {
      console.error('Failed to delete order:', error);
    });
  };

  const formTime = (time: string) => {
    return new Date(time).toLocaleString();
  }

  if (userLoading || ordersLoading) return <CircularProgress />;
  if (userError) return <Typography color="error">User Error: {userError}</Typography>;
  if (!orders || orders.length === 0) return <Typography>No Orders yet</Typography>;
  if (ordersError) return <Typography color="error">Orders Error: {ordersError}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {orders.map((order: Order) => (
          <Card raised key={order.id}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => handleDelete(order.id)} 
              sx={{ margin: 2, alignSelf: 'flex-start' }}
            >
              Delete Order
            </Button>
            <CardContent>
              <Typography gutterBottom>
                Order ID: {order.id}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Created At: {formTime(order.createdAt)}
              </Typography>
            </CardContent>
            {order.items.map((item: OrderItem, index) => (
              <CardContent key={item.id} sx={{
                borderBottom: index !== order.items.length - 1 ? '1px solid #ccc' : ''
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.product?.image}
                  alt={item.product?.title}
                />
                <Typography gutterBottom variant="h5" component="div">
                  {item.product?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.product?.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: ${item.product?.price}
                </Typography>
              </CardContent>
            ))}
          </Card>
        ))}
      </Masonry>
    </Box>
  );
};

export default OrdersPage;
