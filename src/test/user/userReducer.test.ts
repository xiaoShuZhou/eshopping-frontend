import { register, login, logout, getProfile } from "../../redux/slices/userSlice";
import { testStore } from "../../redux/store";
import { mockUser, newUser } from "../mockdata/user";
import { userServer } from "../testServer/userServer";
import { RegisterRequest } from "../../types/user";

if (!newUser.name) {
  console.error("Registration requires a name.");
}
const registerData: RegisterRequest = {
  email: newUser.email,
  password: newUser.password,
  name: newUser.name || '', // Provide a default value for the name property
  ...(newUser.avatar && { avatar: newUser.avatar }),
};

let store = testStore();

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

beforeEach(() => {
  store = testStore();
});

describe("user reducer", () => {
  test("should register a new user", async () => {
    const result = await store.dispatch(register(registerData));
    const expectedPayload = expect.objectContaining({
      id: expect.any(Number), 
      ...newUser,
    });
    expect(result.payload).toEqual(expectedPayload);
    expect(store.getState().user.user).toEqual(result.payload);
    expect(store.getState().user.isAuthenticated).toBe(true);
  });

  // Test for logging in a user
  test("should login a user", async () => {
    const result = await store.dispatch(login(mockUser[0]));
    expect(store.getState().user.user).toEqual(result.payload);
    expect(store.getState().user.isAuthenticated).toBe(true);
  });

  // Test for logging out a user
  test("should logout a user", async () => {
    await store.dispatch(login(mockUser[0]));
    await store.dispatch(logout());
    expect(store.getState().user.user).toBeNull();
    expect(store.getState().user.isAuthenticated).toBe(false);
  });

  // Test for getting user profile
  test("should fetch the user profile successfully", async () => {
    // Mock logging in to set the token
    const loginResult = await store.dispatch(login(mockUser[0]));
    const token = loginResult.payload.access_token;
    const profileResult = await store.dispatch(getProfile(token));
    expect(profileResult.payload).toEqual(expect.objectContaining({
      // Assuming your profile includes fields like id, name, email, etc.
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
    }));
    expect(store.getState().user.user).toEqual(profileResult.payload);
    expect(store.getState().user.isAuthenticated).toBe(true);
  });
});
