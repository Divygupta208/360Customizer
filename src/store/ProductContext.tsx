import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../api/ProductServices/services";
import type { cartProduct, Product } from "../data/products";

interface ProductContextType {
  allProducts: Product[];
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  fetchAllProducts: () => void;
  deleteProduct: (productId: number) => void;
  isLoading: boolean;
  error: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setError(false);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCartProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const deleteProduct = (productId: number) => {
    const restItems = cartProducts.filter((p) => p.id !== productId);
    setCartProducts(restItems);
  };

  const removeFromCart = (productId: number) => {
    setCartProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);

      if (existing?.quantity && existing.quantity > 1) {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: (p.quantity ?? 1) - 1 } : p
        );
      } else {
        return prev.filter((p) => p.id !== productId);
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        cartProducts,
        addToCart,
        fetchAllProducts,
        removeFromCart,
        deleteProduct,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return context;
};
