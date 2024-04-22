import { testStore } from '../redux/store';
import { submitOrderFromCart, getOrdersByUserId, deleteOrder } from '../redux/slices/orderSlice';
import { Order} from '../types/order';
import { User } from '../types/user';
import { CartItem } from '../types/cart';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASE_URL } from '../misc/constants';

const axiosMock = new MockAdapter(axios);

describe('orderSlice', () => {
  let store: ReturnType<typeof testStore>;

  beforeEach(() => {
    store = testStore();
    axiosMock.reset();
  });

  test('should handle initial state', () => {
    expect(store.getState().order).toEqual({ orders: [], loading: false, error: null });
  });

  test('submitting an order updates state correctly', async () => {
    const mockUser: User = {
      id: 'user1', userName: 'John Doe', email: 'q2134@qq.com', password: '6666',
      firstName: 'John',
      lastName: 'Doe'
    };
    const mockCartItems: CartItem[] = [
      { id: 'product1', title: 'Product 1', price: 10, quantity: 2, description: 'my product', image: 'test.png', category: { id: 'at1', name: 'Category 1' } },
    ];
    const mockOrder = {
      id: 'order1',
      user: mockUser,
      items: mockCartItems.map(item => ({
        product: item.id,
        quantity: item.quantity
      })),
      createdAt: new Date().toISOString()
    };
    axiosMock.onPost(`${BASE_URL}/orders`).reply(200, mockOrder);

    await store.dispatch(submitOrderFromCart({ cartItems: mockCartItems, user: mockUser }));
    
    const { orders, loading, error } = store.getState().order;
    expect(orders).toContainEqual(mockOrder);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

  test('fetching orders by user ID updates state', async () => {
    const userId = 'user1';
    const mockOrders: Order[] = [
      { id: 'order1', user: {
        id: 'user1', userName: 'John Doe', email: 'q2134@qq.com', password: '6666',
        firstName: 'John',
        lastName: 'Doe'
      }, items: [], createdAt: '2021-01-01T00:00:00Z' }
    ];
    axiosMock.onGet(`${BASE_URL}/orders/getOrdersByuser/${userId}`).reply(200, mockOrders);

    await store.dispatch(getOrdersByUserId(userId));
    
    const { orders, loading, error } = store.getState().order;
    expect(orders).toEqual(mockOrders);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

  test('deleting an order removes it from state', async () => {
    const orderIdToDelete = 'order1';
    axiosMock.onDelete(`${BASE_URL}/orders/${orderIdToDelete}`).reply(200, orderIdToDelete);

    await store.dispatch(deleteOrder(orderIdToDelete));

    await new Promise(resolve => setTimeout(resolve, 100));

    const { orders } = store.getState().order;
    expect(orders).toEqual(expect.not.arrayContaining([expect.objectContaining({ id: orderIdToDelete })]));
  });

});
