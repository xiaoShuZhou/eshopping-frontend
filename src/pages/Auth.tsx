import React, { useState } from 'react';
import Register from '../components/Register'; 
import Login from '../components/Login'; 
import { Container, Typography, Button, Box } from '@mui/material';

const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isRegister ? <Register /> : <Login />}
        <Typography variant="body2" sx={{ mt: 2 }}>
          {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
          <Button
            sx={{ ml: 1 }}
            color="primary"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Auth;
