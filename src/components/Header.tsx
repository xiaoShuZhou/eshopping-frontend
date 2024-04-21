import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user);
  const userRole = useAppSelector((state) => state.user.user?.role);

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" sx={{ flexGrow: 1 }}>
          <Grid item xs={6} sm={4} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={RouterLink} to="/" sx={{ typography: 'h6' }}>
                FullStackHub
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {userRole === 'admin' && (
              <>
                <Button color="inherit" component={RouterLink} to="/post">
                  Blog
                </Button>
                <Button color="inherit" component={RouterLink} to="/manage-categories">
                  Categories
                </Button>
              </>
            )}
            <Button color="inherit" component={RouterLink} to={user ? '/profile' : '/auth'}>
              {user ? 'Profile' : 'Login'}
            </Button>
            {user && ( // Conditional rendering based on user being logged in
              <>
                <Button color="inherit" component={RouterLink} to="/order">
                  Orders
                </Button>
                <Button color="inherit" component={RouterLink} to="/cart">
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartRoundedIcon />
                  </Badge>
                </Button>
              </>
            )}
            <ThemeToggleButton />
          </Grid>
          {isMobile && (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              {/* Mobile specific UI elements */}
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
