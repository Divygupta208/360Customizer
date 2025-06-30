import "./App.css";
// import { FaLinkedin, FaGithub } from "react-icons/fa";
// import type { ProfileCardData } from "./types/Card";
import ProductListing from "./components/Pages/Product/ProductListing";
import { Navigate, Route, Routes } from "react-router";
import ProductDetails from "./components/Pages/Product/ProductDetails";
import SignupPage from "./components/Pages/Home/SignupPage";
import Dashboard from "./components/Pages/Home/Dashboard";
import ProtectedRoute from "./components/Pages/RouteProtection/ProtectedRoute";
import NotFound from "./components/UI/NotFound/NotFound";
import ProductCart from "./components/Pages/Product/ProductCart";
import MainLayout from "./components/Layout/LayoutContainers/MainLayout";
import Home from "./components/Pages/Home/Home";
import OrderSummary from "./components/Pages/Order/OrderSummary";
import MyOrders from "./components/Pages/Order/Myorders";
import { useProductContext } from "./store/ProductContext";
import { useEffect } from "react";
import MyAccount from "./components/Pages/User/MyAccount";
import MyAddresses from "./components/Pages/User/MyAddresses";
import { ToastContainer } from "react-toastify";

function App() {
  const { setCartProducts, setOrders, cartProducts, orders } =
    useProductContext();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setCartProducts(storedCart);
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path={"/login"} element={<SignupPage />} />
        <Route path="/" element={<Navigate to={"/home"} replace />} />
        <Route path={"/home"} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<MyAccount />} />
            <Route
              path="products/checkout/:orderId"
              element={<OrderSummary />}
            />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="profile/addresses" element={<MyAddresses />} />
          </Route>
          <Route path="cart" element={<ProductCart />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="products/:productId" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
