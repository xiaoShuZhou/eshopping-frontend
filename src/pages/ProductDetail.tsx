import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const product = products.find(p => p.id === Number(productId));

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(Number(productId)));
    }
  }, [dispatch, productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Render other product details as needed */}
      <img src={JSON.parse(product.images[0])[0]} alt={product.title} style={{width: '100px', height: '100px'}} />
      
    </div>
  );
};

export default ProductDetail;
