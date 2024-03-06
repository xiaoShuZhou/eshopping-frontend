// productServer.ts
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { Product,NewProduct } from '../../types/product'; // Ensure the correct path to your types
import { fakeProduct } from '../mockdata/product'; // Ensure the correct path to your mock data
import  { BASE_URL } from '../../misc/constants';
// MSW handlers to simulate network responses
const handlers = [
  //Handler for fetching all products
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json(fakeProduct, { status: 200 });
  }),

  // Fetch a single product detail
  http.get(
    `${BASE_URL}/products/:id`,
    async ({ params }) => {
      const id = Number(params.id);
      const product = fakeProduct.find((item) => item.id === id);
      return HttpResponse.json(product, { status: 200 });
    }
  ),

 
  // Create a new product
  http.post(`${BASE_URL}/products/:id`, async ({request}) => {
    const newProduct= (await request.json()) as NewProduct;
    const product: Product = { ...newProduct, id: 2,      category: {
      id: 2,
      name: "Electronics",
      image: "https://example.com/image.jpg",
      creationAt: "2024-03-06T01:43:26.000Z",
      updatedAt: "2024-03-06T01:43:26.000Z",
    }, };
    fakeProduct.push(product);
    return HttpResponse.json(product, { status: 201 });
  }),

  // Update a product
  http.put(`${BASE_URL}/products/:id`, async () => {
    const product = fakeProduct[1];
    product.title = "Stylish Notebook";
    return HttpResponse.json(product, { status: 200 });
  }),

  // Delete a product
  http.delete(`${BASE_URL}/products/:id`, async (request) => {
    const id = Number(request.params.id);
    const index = fakeProduct.findIndex((item) => item.id === id);
    if (index !== -1) {
      fakeProduct.splice(index, 1);
      return HttpResponse.json({ message: 'Product deleted' }, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  }),
]

// Create the server
export const productServer = setupServer(...handlers);
