import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from '../redux/slices/cartSlice';
import { CartItem } from '../types/cart';
import { testStore} from '../redux/store'


describe('cartSlice', () => {
  let store: ReturnType<typeof testStore>;

  beforeEach(() => {
    store = testStore();
  });

  test('should handle initial state', () => {
    expect(store.getState().cart).toEqual({ items: [] });
  });

  test('should handle adding items to the cart', () => {
    const item: CartItem = {
      id: '1',
      title: 'Product 1',
      price: 100,
      description: 'A great product',
      image: 'image-url',
      category: { id: 'cat1', name: 'Category 1' },
      quantity: 1
    };
    store.dispatch(addToCart({ item }));
    expect(store.getState().cart.items).toEqual([item]);
  });

  test('should handle removing items from the cart', () => {
    const item: CartItem = {
      id: '1',
      title: 'Product 1',
      price: 100,
      description: 'A great product',
      image: 'image-url',
      category: { id: 'cat1', name: 'Category 1' },
      quantity: 1
    };
    store.dispatch(addToCart({ item }));
    store.dispatch(removeFromCart(item.id));
    expect(store.getState().cart.items).toEqual([]);
  });

  test('should handle increasing item quantity', () => {
    const item: CartItem = {
      id: '1',
      title: 'Product 1',
      price: 100,
      description: 'A great product',
      image: 'image-url',
      category: { id: 'cat1', name: 'Category 1' },
      quantity: 1
    };
    store.dispatch(addToCart({ item }));
    store.dispatch(increaseQuantity(item.id));
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  test('should handle decreasing item quantity', () => {
    const item: CartItem = {
      id: '1',
      title: 'Product 1',
      price: 100,
      description: 'A great product',
      image: 'image-url',
      category: { id: 'cat1', name: 'Category 1' },
      quantity: 2
    };
    store.dispatch(addToCart({ item }));
    store.dispatch(decreaseQuantity(item.id));
    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  test('should handle emptying the cart', () => {
    const item: CartItem = {
      id: '1',
      title: 'Product 1',
      price: 100,
      description: 'A great product',
      image: 'image-url',
      category: { id: 'cat1', name: 'Category 1' },
      quantity: 1
    };
    store.dispatch(addToCart({ item }));
    store.dispatch(emptyCart());
    expect(store.getState().cart.items).toEqual([]);
  });
});
