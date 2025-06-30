import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthContextProvider } from "./store/AuthContext.tsx";
import { ProductProvider } from "./store/ProductContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ProductProvider>
  </StrictMode>
);
