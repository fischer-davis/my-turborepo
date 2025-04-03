import { createAuthClient } from "better-auth/react";

const serverPort = 3000;

export const authClient = createAuthClient({
  baseURL: `http://localhost:${serverPort}`, // the base url of your auth server
});