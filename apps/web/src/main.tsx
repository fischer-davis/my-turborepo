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

const rootElement = document.getElementById("app");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element with id 'app' not found in the DOM.");
}

