import React, { createContext, useState, type ReactNode } from "react";
import { useProductContext } from "./ProductContext";
import type { Address, User } from "../types/User";

export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  setUserAddresses: (address: Address[]) => void;
  deleteAddress: (addressId: number) => void;
  editAddress: (updatedAddress: Address) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn"))
  );

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [addresses, setUserAddresses] = useState<Address[]>(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });

  const { setOrders } = useProductContext();

  const addAddress = (address: Address) => {
    const updated = [...addresses, address];
    setUserAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const deleteAddress = (addressId: number) => {
    const updated = addresses.filter((addr) => addr.id !== addressId);
    setUserAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const editAddress = (updatedAddress: Address) => {
    const updated = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    setUserAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem("user", "");
    localStorage.setItem("isLoggedIn", "false");
    setUserAddresses([]);
    localStorage.removeItem("addresses");
    setOrders([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        addresses,
        addAddress,
        setUserAddresses,
        deleteAddress,
        editAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
