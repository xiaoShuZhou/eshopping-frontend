import { testStore } from '../redux/store';
import { getProducts, createProduct, deleteProduct, updateProduct, getProductDetail, getProductsWithFilters } from '../redux/slices/productSlice';
import { Product, NewProduct, UpdatedProduct } from '../types/product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASE_URL } from '../misc/constants';

const axiosMock = new MockAdapter(axios);

describe('productSlice', () => {
  let store: ReturnType<typeof testStore>;

  beforeEach(() => {
    store = testStore();
    axiosMock.reset();  // Ensure the mock is cleared after each test
  });

  test('should handle initial state', () => {
    expect(store.getState().product).toEqual({ products: [], loading: false, error: null });
  });

  test('fetching products successfully updates state', async () => {
    const mockProducts: Product[] = [
      { id: '1', title: 'Laptop', price: 999, description: 'High performance laptop', image: 'laptop.png', category: { id: '1', name: 'Electronics' } },
      { id: '2', title: 'Book', price: 20, description: 'Interesting novel', image: 'book.png', category: { id: '2', name: 'Books' } }
    ];
    axiosMock.onGet(`${BASE_URL}/products`).reply(200, mockProducts);

    await store.dispatch(getProducts());
    
    const { products, loading, error } = store.getState().product;
    expect(products).toEqual(mockProducts);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

  test('creating a product adds it to state', async () => {
    const newProduct: NewProduct = {
      title: 'Smartphone',
      price: 700,
      description: 'Latest model smartphone',
      category: '1',
      image: 'smartphone.png'
    };
    const expectedProduct: Product = {
      ...newProduct,
      id: '3',
      category: { id: '1', name: 'Electronics' }
    };
    axiosMock.onPost(`${BASE_URL}/products`, newProduct).reply(200, expectedProduct);

    await store.dispatch(createProduct(newProduct));

    const { products } = store.getState().product;
    expect(products).toContainEqual(expectedProduct);
  });

  test('deleting a product removes it from state', async () => {
    const productIdToDelete = '3';
    axiosMock.onDelete(`${BASE_URL}/products/${productIdToDelete}`).reply(204);

    await store.dispatch(deleteProduct(productIdToDelete));

    const { products } = store.getState().product;
    expect(products).toEqual(expect.not.arrayContaining([{ id: productIdToDelete }]));
  });
  

  test('fetching product detail updates the specific product', async () => {
    const productDetail: Product = { id: '1', title: 'Laptop', price: 999, description: 'High performance laptop', image: 'laptop.png', category: { id: '1', name: 'Electronics' } };
    axiosMock.onGet(`${BASE_URL}/products/1`).reply(200, productDetail);

    await store.dispatch(getProductDetail('1'));

    const { products } = store.getState().product;
    expect(products).toContainEqual(productDetail);
  });

  test('applying filters updates products based on filters', async () => {
    const filteredProducts: Product[] = [
      { id: '2', title: 'Filtered Book', price: 15, description: 'Filtered book description', image: 'book.png', category: { id: '2', name: 'Books' } }
    ];
    axiosMock.onGet(`${BASE_URL}/products/filter?title=book&priceMin=10&priceMax=20`).reply(200, filteredProducts);

    await store.dispatch(getProductsWithFilters({ title: 'book', priceMin: 10, priceMax: 20 }));

    const { products } = store.getState().product;
    expect(products).toEqual(filteredProducts);
  });
});
