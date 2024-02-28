import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getImageUrl } from '../misc/uploadFileService';
import { addToCart } from '../redux/slices/cartSlice';
import { deleteProduct } from '../redux/slices/productSlice';
import { Link} from 'react-router-dom'

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const cartItems = useAppSelector((state) => state.cart.items);
  const product = products.find(p => p.id === Number(productId));
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(Number(productId)));
    }

    // Check if product is in the cart
    setIsInCart(cartItems.some(item => item.id === Number(productId)));
  }, [dispatch, productId, cartItems]); // Add cartItems to the dependency array

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ item: { ...product, quantity: 1 } }));
      setIsInCart(true); // Set isInCart to true after adding to cart
    }
  };

  const handleDeleteProduct = () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(Number(productId)));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={getImageUrl(product.images[0])} alt={product.title} style={{width: '100px', height: '100px'}} />
      {isInCart ? (
        <button disabled>Item already added to cart</button>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    <button onClick={handleDeleteProduct}>Delete Product</button>
    <Link to={`/update-product/${product.id}`}>Update Product</Link>
    </div>
  );
};

export default ProductDetail;
