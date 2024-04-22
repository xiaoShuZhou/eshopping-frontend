import { testStore } from '../redux/store';
import { getCategories, createCategory, deleteCategory } from '../redux/slices/categorySlice';
import { Category } from '../types/category';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASE_URL } from '../misc/constants';

const axiosMock = new MockAdapter(axios);

describe('categorySlice', () => {
  let store: ReturnType<typeof testStore>;

  beforeEach(() => {
    store = testStore();
    axiosMock.reset();  // Ensure the mock is cleared after each test
  });

  test('should handle initial state', () => {
    expect(store.getState().category).toEqual({ categories: [], loading: false, error: null });
  });

  test('fetching categories successfully updates state', async () => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Books' }
    ];
    axiosMock.onGet(`${BASE_URL}/categories`).reply(200, mockCategories);

    await store.dispatch(getCategories());
    
    const { categories, loading, error } = store.getState().category;
    expect(categories).toEqual(mockCategories);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

test('creating a category adds it to state', async () => {
  const newCategory: Category = { id: '3', name: 'Clothing' };
  axiosMock.onPost(`${BASE_URL}/categories`, { name: 'Clothing' }).reply(200, newCategory);

  await store.dispatch(createCategory({ name: 'Clothing' }));
  
  // Add a delay or another mechanism to ensure state has settled
  await new Promise(resolve => setTimeout(resolve, 100));

  const { categories } = store.getState().category;
  expect(categories).toContainEqual(newCategory);

});

test('deleting a category removes it from state', async () => {
  // Set up initial state
  store.dispatch({
    type: 'category/fetchCategories/fulfilled',
    payload: [
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Books' },
      { id: '3', name: 'Clothing' }
    ]
  });

  const categoryIdToDelete = '3';
  axiosMock.onDelete(`${BASE_URL}/categories/${categoryIdToDelete}`).reply(204);

  await store.dispatch(deleteCategory(categoryIdToDelete));

  // Ensure all async operations have completed
  await new Promise(resolve => setTimeout(resolve, 100));

  const { categories } = store.getState().category;
  expect(categories).toEqual([
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Books' }
  ]);
});

});
