// LoginPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Button, TextField, Box, Typography } from '@mui/material';
import { login } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert('Please fill in all inputs to login.');
      return;
    }
    // Dispatching the login action and handling the promise
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        window.alert("Login successfully!");
        navigate('/');
      })
      .catch((error) => {
        window.alert("Login failed！please check your email and password.");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default Login;