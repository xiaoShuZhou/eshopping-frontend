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
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const imageUrl = await uploadImage(files[0]);
        setAvatar(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ email, password, name, avatar }));
    window.alert("Register successfully!");
    navigate('/');
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
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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