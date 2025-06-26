import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../../store/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import { useProductContext } from "../../../store/ProductContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { cartProducts } = useProductContext();
  const navigate = useNavigate();
  if (!auth) {
    <Navigate to={"/"} />;
  }
  const { logout }: any = auth;

  const handleUserLogout = () => {
    localStorage.removeItem("isLoggedIn");
    logout();
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };
  return (
    <div className="w-screen h-screen">
      <div className="shadow-2xl h-[10%] flex justify-between box-border p-6">
        <div></div>
        <div className="flex gap-3 justify-between items-center">
          <Link to={"/products"} className="rounded px-4">
            Products
          </Link>
          <Link to={"/profile"} className="px-4 rounded">
            Profile
          </Link>

          <button
            className="text-red-500 font-bold cursor-pointer"
            onClick={(e) => handleUserLogout()}
          >
            Log Out
          </button>
          <button
            className=" rounded-xl bg-white transition duration-200 hover:scale-110"
            onClick={(e) => handleCartClick()}
          >
            <FaCartShopping className="w-6 h-6 text-blue-500" />
            {cartProducts.length > 0 && (
              <span className="absolute top-1 right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="h-[90%] flex justify-center items-center">
        <h1 className="font-bold text-4xl flex">
          Dashboard{" "}
          <span className="text-blue-700">
            <img
              src="https://www.svgrepo.com/show/485513/dashboard-layout.svg"
              className="w-30 h-30 object-contain"
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
