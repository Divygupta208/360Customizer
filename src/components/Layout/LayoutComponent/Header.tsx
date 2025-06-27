import { useState, useContext } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaCartShopping, FaUser, FaBars } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router";
import { useProductContext } from "../../../store/ProductContext";
import { AuthContext } from "../../../store/AuthContext";
import Breadcrumbs from "../../UI/Navigation/Breadcrumb";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearch } = useProductContext();

  const { cartProducts } = useProductContext();
  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Auth Context not found</div>;
  }

  const { isLoggedIn, logout } = auth;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="fixed md:relative min-w-[300px] top-0 left-0 w-full bg-white shadow-xl z-50">
        <div className="flex items-center justify-between px-4 py-3 md:py-4 md:px-8">
          <div className="flex items-center" onClick={() => navigate("/home")}>
            <img
              src="/product.svg"
              className="w-10 h-10 object-contain md:block hover:scale-110"
              alt="logo"
            />
          </div>

          <div className="flex-grow mx-4 hidden md:flex justify-center">
            {isLoggedIn && (
              <div className="flex items-center w-full max-w-md">
                <input
                  type="text"
                  placeholder="search..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="bg-white transition-all duration-300 ease-in-out w-full px-3 py-2 border border-gray-300 rounded-l"
                />
                <button className="px-3 py-2">
                  <FaSearch className="text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="products" className="text-gray-700 hover:text-blue-400">
              Products
            </Link>
            <Link to="myorders" className="text-gray-700 hover:text-blue-400">
              Orders
            </Link>
            <Link
              to={isLoggedIn ? "profile" : "/login"}
              className="hover:text-blue-400"
            >
              {isLoggedIn ? (
                <FaUser className="w-5 h-5 text-black hover:text-blue-400" />
              ) : (
                "Login"
              )}
            </Link>
            <Link to="cart" className="relative ">
              <FaCartShopping className="w-5 h-5 text-black hover:text-blue-400" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="hover:text-red-500 text-xl"
              onClick={() => handleLogout()}
            >
              {" "}
              <BiLogOut />
            </button>
          </div>

          <button
            className="md:hidden text-gray-800 focus:outline-none mr-0"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute right-0 bg-white px-4 pb-4 flex flex-col gap-2 w-full border-b-2 shadow-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <button className="text-gray-600">
                <FaSearch />
              </button>
            </div>

            <Link to="products" className="text-gray-700 hover:text-blue-400">
              Products
            </Link>
            <Link to="myorders" className="text-gray-700 hover:text-blue-400">
              Orders
            </Link>
            <Link
              to={isLoggedIn ? "profile" : "/login"}
              className="text-gray-700 hover:text-blue-400"
            >
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
            <Link
              to="cart"
              className="relative text-gray-700 hover:text-blue-400"
            >
              <FaCartShopping className="inline-block mr-1" />
              Cart
              {cartProducts.length > 0 && (
                <span className="absolute top-0 right-3 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="hover:text-red-500"
              onClick={() => handleLogout()}
            >
              <BiLogOut />
            </button>
          </div>
        )}
        <div className="bg-gray-200">
          <Breadcrumbs />
        </div>
      </header>
    </>
  );
};

export default Header;
