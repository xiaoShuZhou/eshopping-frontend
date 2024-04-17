// RegisterPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Button, TextField, Box, Typography } from '@mui/material';
import { register } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../misc/uploadFileService';
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate();
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const file = files[0];
        const imageUrl = await uploadImage(file);
        console.log(imageUrl, 'imageUrl');
        setAvatar(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!email || !password || !userName || !firstName || !lastName || !avatar) {
      window.alert('Please fill in all fields before registering.');
      return;
    }
  
    // Dispatching the register action and handling the promise
    dispatch(register({ email, password, firstName, lastName, userName, avatar }))
      .unwrap()
      .then(() => {
        window.alert("Register successfully!");
        navigate('/');
      })
      .catch((error) => {
        console.error('Register failed!', error);
        window.alert("Register failed: please change your email and userName");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="userName"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <Button
              component="label"
              variant="contained"
              color="primary"
              fullWidth
            >
              Upload Avatar
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;