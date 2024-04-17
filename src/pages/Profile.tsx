import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getProfile, logout } from '../redux/slices/userSlice';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useAppSelector((state) => state.user);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) { 
          dispatch(getProfile(token));
      } else {
          console.log("No access token found. Please login.");
      }
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        user ?
        <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
            <CardContent>
                <Avatar
                    alt={user?.userName || 'User'}
                    src={user?.avatar || ''}
                    sx={{ width: 56, height: 56, mb: 2, margin: 'auto' }}
                />
                <Typography gutterBottom variant="h5" component="div">
                    {user?.userName || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Name: {user?.firstName || 'N/A'} {user?.lastName || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: {user?.email || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Role: {user?.role || 'N/A'}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }} 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{ mt: 2, ml: 2}} 
                    component={Link}
                    to={`/update-profile/${user.id}`}
                >
                    Update Profile
                </Button>
            </CardContent>
        </Card>
        :
        <Typography>Please login to view your profile.</Typography>
    );
};

export default Profile;
