import {
  getProducts,
  getProductDetail,
  getProductsWithFilters,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/slices/productSlice";
import { testStore } from "../../redux/store";
import { Product, NewProduct, UpdatedProduct } from "../../types/product";

import { fakeProduct } from "../mockdata/product";

import { productServer } from "../testServer/productServer";

let store = testStore();

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

beforeEach(() => {
  store = testStore();
});

describe("product reducer", () => {
  test("should fetch all products from api", async () => {
    await store.dispatch(getProducts());
    const state = store.getState();
    expect(state.product.products.length).toBeGreaterThan(0);
  });

  test("should fetch product details", async () => {
    const productId = fakeProduct[0].id; // Use the first product's id from fakeProduct
    await store.dispatch(getProductDetail(productId));
    const state = store.getState();
    const product = state.product.products.find(product => product.id === productId);
    expect(product).toBeDefined();
  });

  test("should create a product", async () => {
    const newProduct: NewProduct = {
      title: "New Test Product",
      price: 100,
      description: "A description of the new product",
      categoryId: 1, 
      images: ["https://example.com/default-image.jpg"],
    };
    await store.dispatch(createProduct(newProduct));
    const state = store.getState();
    const product = state.product.products.find(product => product.title === newProduct.title);
    expect(product).toBeDefined();
  });

  test("should delete a product", async () => {
    const productId = fakeProduct[0].id; 
    await store.dispatch(deleteProduct(productId));
    const state = store.getState();
    const productExists = state.product.products.some(product => product.id === productId);
    expect(productExists).toBe(false);
  });

  test("should update a product", async () => {
    const productId = fakeProduct[0].id; // Use the first product's id for update
    const updatedProduct: UpdatedProduct = {
      title: "Updated Test Product",
      price: 200,
      description: "An updated description",
      categoryId: 2,
      images: ["https://example.com/updated-image.jpg"],
    };
    await store.dispatch(updateProduct({ id: productId, updateData: updatedProduct }));
    const state = store.getState();
    const product = state.product.products.find(product => product.id === productId);
    if (product) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(product.title).toEqual(updatedProduct.title);
    }
  });

  test("should fetch products with filters", async () => {
    const filters = { title: "GoldBerg WWE" }; // Example filter by title
    await store.dispatch(getProductsWithFilters(filters));
    const state = store.getState();
    const products = state.product.products.filter(product => product.title.includes(filters.title));
    expect(products.length).toBeGreaterThan(0);
  });
});
