import { Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div><Link to="/">FullStackHub</Link></div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/post">Post</Link>
        <Link to="/showblogs">Blogs</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;