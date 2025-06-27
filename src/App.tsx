import "./App.css";
// import { FaLinkedin, FaGithub } from "react-icons/fa";
// import type { ProfileCardData } from "./types/Card";
import ProductListing from "./components/Pages/Product/ProductListing";
import { Navigate, Route, Routes } from "react-router";
import ProductDetails from "./components/Pages/Product/ProductDetails";
import Breadcrumbs from "./components/UI/Navigation/Breadcrumb";
import SignupPage from "./components/Pages/Home/SignupPage";
import Dashboard from "./components/Pages/Home/Dashboard";
import ProtectedRoute from "./components/Pages/RouteProtection/ProtectedRoute";
import UserProfile from "./components/Pages/User/UserProfile";
import NotFound from "./components/UI/NotFound/NotFound";
import ProductCart from "./components/Pages/Product/ProductCart";

function App() {
  // const user: ProfileCardData = {
  //   name: "Sophie Benette",
  //   role: "software developer",
  //   organisation: "google",
  //   profilePicture:
  //     "https://images.pexels.com/photos/160414/female-portrait-studio-attractive-160414.jpeg",
  //   bio: "developer who focuses on readability and maintains a good code",
  //   socialLinks: [
  //     {
  //       social: "linkedIn",
  //       logo: <FaLinkedin />,
  //       link: "https://linkedin.com",
  //     },
  //     {
  //       social: "Github",
  //       logo: <FaGithub />,
  //       link: "https://github.com",
  //     },
  //   ],
  // };

  return (
    <>
      {/* <Breadcrumbs /> */}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route path={"/login"} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
