import {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";
import { testStore } from "../../redux/store";
import { mockCartItem } from "../mockdata/cart";

let store = testStore();

beforeEach(() => {
  store.dispatch(emptyCart());
});

describe("cartSlice reducer", () => {
  // Test for adding an item to the cart
  test("should add cart item to cart", () => {
    store.dispatch(addToCart({ item: mockCartItem }));
    expect(store.getState().cart.items).toEqual([mockCartItem]);
  });

  // Test for removing an item from the cart
  test("should remove cart item from cart", () => {
    store.dispatch(addToCart({ item: mockCartItem }));
    store.dispatch(removeFromCart(mockCartItem.id));
    expect(store.getState().cart.items).toEqual([]);
  });

  // Test for increasing quantity of a cart item
  test("should increase quantity of cart item", () => {
    store.dispatch(addToCart({ item: mockCartItem }));
    store.dispatch(increaseQuantity(mockCartItem.id));
    expect(store.getState().cart.items).toEqual([
      { ...mockCartItem, quantity: mockCartItem.quantity + 1 },
    ]);
  });

  // Test for decreasing quantity of a cart item
  test("should decrease quantity of cart item", () => {
    store.dispatch(addToCart({ item: mockCartItem }));
    store.dispatch(increaseQuantity(mockCartItem.id)); // Increase first to ensure decrease doesn't go below initial
    store.dispatch(decreaseQuantity(mockCartItem.id));
    expect(store.getState().cart.items).toEqual([
      { ...mockCartItem, quantity: mockCartItem.quantity },
    ]);
  });

  // Test for emptying the cart
  test("should empty the cart", () => {
    store.dispatch(addToCart({ item: mockCartItem }));
    store.dispatch(emptyCart());
    expect(store.getState().cart.items).toEqual([]);
  });
});
