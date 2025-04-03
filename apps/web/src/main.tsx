import { createRoot } from "react-dom/client";
import "./style.css";
import { StrictMode } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "./router";

const router = createRouter();

const App = () => (
<StrictMode>
  <RouterProvider router={router} />
</StrictMode>
);

createRoot(document.getElementById("app")!).render(<App />);
