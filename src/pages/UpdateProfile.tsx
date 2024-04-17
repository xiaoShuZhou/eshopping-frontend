import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateProfile, getProfile } from '../redux/slices/userSlice';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { UpdatedUser } from '../types/user';
import { uploadImage } from '../misc/uploadFileService';
import { useParams } from 'react-router-dom';

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const { userId } = useParams();

  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const file = files[0];
        const imageUrl = await uploadImage(file);
        setUpdatedUser({ ...updatedUser, avatar: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedUser.userName || !updatedUser.firstName || !updatedUser.lastName || !updatedUser.email || !updatedUser.avatar) {
      alert('Please fill in all fields before updating your profile.');
      return;
    }
    if (!userId) {
      alert('User ID is undefined.');
      return;
    }
    dispatch(updateProfile({ id: userId, updatedUser: updatedUser })).unwrap().then(() => {
      alert('Profile updated successfully!');
      navigate('/profile');
    }).catch((error) => {
      console.error('Update profile failed:', error);
      alert("Update profile failed!");
    });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom component="div">
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="userName"
              label="Username"
              fullWidth
              variant="outlined"
              value={updatedUser.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              value={updatedUser.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={updatedUser.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={updatedUser.email}
              onChange={handleChange}
            />
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
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateProfile;
