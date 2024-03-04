
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { fakeCategory } from "../mockdata/category";

export const handler = [
  //Handler for fetching all categories
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(fakeCategory, { status: 200 });
  }),
];

export const categoryServer = setupServer(...handler);