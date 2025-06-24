import "./App.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import type { ProfileCardData } from "./types/Card";
import ProductListing from "./components/Pages/ProductListing";
import { Route, Routes } from "react-router";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import Breadcrumbs from "./components/UI/Navigation/Breadcrumb";

function App() {
  const user: ProfileCardData = {
    name: "Sophie Benette",
    role: "software developer",
    organisation: "google",
    profilePicture:
      "https://images.pexels.com/photos/160414/female-portrait-studio-attractive-160414.jpeg",
    bio: "developer who focuses on readability and maintains a good code",
    socialLinks: [
      {
        social: "linkedIn",
        logo: <FaLinkedin />,
        link: "https://linkedin.com",
      },
      {
        social: "Github",
        logo: <FaGithub />,
        link: "https://github.com",
      },
    ],
  };

  return (
    <>
      <Breadcrumbs />
      <Routes>
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>

      {/* <ReusableCard data={user} type={"profile"} /> */}
    </>
  );
}

export default App;
