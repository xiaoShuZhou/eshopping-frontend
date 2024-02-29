// RegisterPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Button, TextField, Box, Typography } from '@mui/material';
import { register } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

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
      <TextField
        margin="normal"
        fullWidth
        label="Avatar URL (optional)"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
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