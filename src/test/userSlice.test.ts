import { testStore } from '../redux/store';
import { login, register, getProfile, updateProfile, logout } from '../redux/slices/userSlice';
import { User, UserState, LoginRequest, RegisterRequest, UpdatedUser } from '../types/user';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASE_URL } from '../misc/constants';

const axiosMock = new MockAdapter(axios);

describe('userSlice', () => {
  let store: ReturnType<typeof testStore>;

  beforeEach(() => {
    store = testStore();
    axiosMock.reset();
  });

  test('should handle initial state', () => {
    expect(store.getState().user).toEqual({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false
    });
  });

  test('successful login stores token and updates state', async () => {
    const token = 'token123';
    axiosMock.onPost(`${BASE_URL}/users/login`).reply(200, { token });
  
    await store.dispatch(login({ email: 'example@example.com', password: 'password' }));
  
    const { isAuthenticated, loading, error } = store.getState().user;
    expect(isAuthenticated).toBe(true); // Assumed isAuthenticated is managed based on token presence
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });
  

  test('successful registration updates state', async () => {
    const newUser: User = {
      id: '2',
      email: 'new@example.com',
      password: 'newpassword',
      firstName: 'Jane',
      lastName: 'Doe',
      userName: 'janedoe',
      role: 'Admin',
      avatar: 'path/to/newavatar.jpg',
      creationAt: '2021-02-01',
      updatedAt: '2021-02-02'
    };
    axiosMock.onPost(`${BASE_URL}/users`).reply(200, newUser);

    await store.dispatch(register({
      email: 'new@example.com',
      password: 'newpassword',
      userName: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      avatar: 'path/to/newavatar.jpg'
    }));

    const { user, isAuthenticated, loading, error } = store.getState().user;
    expect(user).toEqual(newUser);
    expect(isAuthenticated).toBe(true);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

  test('updating user profile updates state', async () => {
    const updatedUser: UpdatedUser = {
      firstName: 'UpdatedJane',
      lastName: 'UpdatedDoe',
      userName: 'updatedjanedoe',
      avatar: 'path/to/updatedavatar.jpg'
    };
    const updatedUserInfo: User = {
      ...store.getState().user.user as User,
      ...updatedUser
    };
    axiosMock.onPut(`${BASE_URL}/users/2`).reply(200, updatedUserInfo);

    await store.dispatch(updateProfile({ id: '2', updatedUser }));

    const { user } = store.getState().user;
    expect(user).toEqual(updatedUserInfo);
  });

  test('logout should reset user state', () => {
    store.dispatch(logout());

    const { user, isAuthenticated } = store.getState().user;
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});
