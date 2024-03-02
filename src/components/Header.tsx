import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { Badge } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user); 
  const userRole = useAppSelector((state) => state.user.user?.role);

  return (
    <header>
      <div><Link to="/">FullStackHub</Link></div>
      <Link to="/cart" color="inherit">
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartRoundedIcon sx={{ ml: 1, fontSize: 24 }} />
        </Badge>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        {userRole === 'admin' && (
          <Link to="/post">Post</Link>
      )}
        <Link to="/cart">Cart</Link>
        {user ? <Link to="/profile">Profile</Link> : <Link to="/auth">Login</Link>}
      </nav>
      <ThemeToggleButton />
    </header>
  );
}

export default Header;
