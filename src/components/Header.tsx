import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { AppBar, Toolbar, Typography, Badge, IconButton, Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user); 
  const userRole = useAppSelector((state) => state.user.user?.role);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            FullStackHub
          </Button>
        </Typography>
        {userRole === 'admin' && (
          <Button color="inherit" component={RouterLink} to="/post">
            Post
          </Button>
        )}
        <Button color="inherit" component={RouterLink} to={user ? "/profile" : "/auth"}>
          {user ? "Profile" : "Login"}
        </Button>
        <Button color="inherit" component={RouterLink} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartRoundedIcon />
          </Badge>
        </Button>

        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
