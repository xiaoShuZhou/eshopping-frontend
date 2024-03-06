import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mockUser,newUser } from "../mockdata/user";

const handlers = [

  // Create a new user
  http.post("https://api.escuelajs.co/api/v1/users", async () => {
    return HttpResponse.json(newUser, { status: 200 });
  }),

  // login
  http.post("https://api.escuelajs.co/api/v1/auth/login", async ({request}) => {
    const user = await request.json();
    return HttpResponse.json(user, { status: 200 });
  }),

  // getProfile
  http.get("https://api.escuelajs.co/api/v1/auth/profile", async (request) => {
    return HttpResponse.json(mockUser[0], { status: 200 });
  }),

];

export const userServer = setupServer(...handlers);