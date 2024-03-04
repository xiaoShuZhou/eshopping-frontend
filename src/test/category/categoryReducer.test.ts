import { getCategories } from "../../redux/slices/categorySlice";
import { testStore } from "../../redux/store";
import { categoryServer } from "../../test/testServer/categoryServer";

let store = testStore();

beforeAll(() => {
  categoryServer.listen();
});

afterAll(() => {
  categoryServer.close();
});

beforeEach(() => {
  store = testStore();
});

describe("category reducer", () => {
  test("should fetch all categories from api", async () => {
    await store.dispatch(getCategories());
    expect(store.getState().category.categories.length).toBe(6);
    expect(store.getState().category.error).toBeNull();
    expect(store.getState().category.loading).toBeFalsy();
  });
});