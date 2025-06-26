import { useProductContext } from "../../../store/ProductContext";
import CartProductCard from "../../UI/Cards/CartProductCard";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

const ProductCart = () => {
  const { cartProducts } = useProductContext();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  if (!auth) {
    return <div>Auth context not found</div>;
  }

  const { isLoggedIn } = auth;

  const overallPrice = cartProducts.reduce((acc, item) => {
    return acc + (item.quantity ?? 0) * item.price;
  }, 0);

  return (
    <div className="flex flex-col h-screen items-center">
      <div className=" w-full h-[10%] flex justify-between items-center box-border p-3">
        <div className="text-xl" onClick={() => navigate(-1)}>{`←`}</div>
        <div className="uppercase text-lg font-semibold text-center">
          Product Cart
        </div>
        <Link
          to={isLoggedIn ? "/profile" : "/login"}
          className="bg-blue-600 text-white px-2 py-1 rounded-xl"
        >
          {isLoggedIn ? "Profile" : "Login"}
        </Link>
      </div>
      <div className="w-full h-[90%] p-2 box-border">
        <div className="text-neutral-400 uppercase font-semibold">Products</div>
        <hr className="text-neutral-300" />
        <div className="cards h-[70%] overflow-scroll">
          {cartProducts.map((product) => {
            return <CartProductCard product={product} />;
          })}
        </div>
        <hr className="text-neutral-300" />
        <div className="text-neutral-400 uppercase">Order Details</div>
        <hr className="text-neutral-300 " />
        <div className=" flex mt-2 flex-row justify-between md:flex-row md:justify-around md:items-center">
          <div className="p-4 flex  flex-col items-center">
            <div className="text-xs font-bold text-neutral-400">
              Total Amount
            </div>
            <div className="text-xl">${overallPrice.toFixed(2)}</div>
          </div>
          <button
            className="text-white bg-blue-600 flex items-center justify-center px-4 md:py-4 gap-2 rounded-xl disabled:bg-gray-500"
            onClick={() => {
              if (isLoggedIn) {
                window.alert("checked out");
              } else {
                window.alert("Please login First");
              }
            }}
          >
            <span className="">Check Out</span>
            <span>{!isLoggedIn && <FaLock />}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
