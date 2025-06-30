import { useProductContext } from "../../../store/ProductContext";
import CartProductCard from "../../UI/Cards/CartProductCard";
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import AddressDropdown from "../../UI/Dropdown/AddressDropdown";
import type { Address } from "../../../types/User";
import { toast } from "react-toastify";
import PaymentMethodSelector from "../../UI/Dropdown/PaymentMethodSelector";

const ProductCart = () => {
  const { cartProducts, addOrder, paymentOption } = useProductContext();
  const navigate = useNavigate();
  const notify = (text: string) => toast.error(text);

  const auth = useContext(AuthContext);
  if (!auth) return <div>Auth context not found</div>;

  const { addresses, isLoggedIn } = auth;

  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const overallPrice = cartProducts.reduce((acc, item) => {
    return acc + (item.quantity ?? 0) * item.price;
  }, 0);

  const handleCheckout = () => {
    if (selectedAddress === undefined) {
      return notify("Please Select A Delivery Address");
    }

    if (!paymentOption) {
      return notify("Please Select a Payment Method");
    }

    if (cartProducts.length === 0) return;

    const orderId = uuidv4();
    const newOrder = {
      orderId,
      items: cartProducts,
      date: new Date().toISOString(),
      shippingAddress: selectedAddress,
      paymentOption,
    };

    addOrder(newOrder);
    navigate(`/home/products/checkout/${orderId}`);
  };

  return (
    <div className="flex flex-col h-fit min-h-[50vh] items-center">
      <div className="w-full h-[60%] md:h-[50%] p-4 box-border mt-5 md:mt-0">
        <div className="text-neutral-400 uppercase font-semibold">Products</div>
        <hr className="text-neutral-300" />
        <div className="cards h-[90%] overflow-scroll">
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartProductCard product={product} key={product.id} />
            ))
          ) : (
            <div className="text-gray-500 text-center mt-6">
              Your cart is empty 🛒
            </div>
          )}
        </div>
        <hr className="text-neutral-300" />
        <div className="text-neutral-400 uppercase">Order Details</div>
        <hr className="text-neutral-300" />

        <div className="flex mt-2 flex-col  justify-between md:flex-row md:justify-around md:items-center">
          <div className="p-4 flex flex-col items-center">
            <div className="text-xs font-bold text-neutral-400">
              Total Amount
            </div>
            <div className="text-xl">${overallPrice.toFixed(2)}</div>
          </div>

          <div className="flex gap-4 border-1 mb-5 md:mb-0 p-2">
            {selectedAddress ? (
              <div className="flex flex-col justify-center box-border rounded-lg text-gray-400 p-4 w-fit">
                <p className="text-black font-semibold">
                  {selectedAddress.fullName}
                </p>
                <p className="text-sm">{selectedAddress.localAddress}</p>
                <p className="text-sm">
                  {selectedAddress.city} , {selectedAddress.state}
                </p>
                <p className="text-black font-semibold">
                  {selectedAddress.mobile}
                </p>
              </div>
            ) : (
              <AddressDropdown
                addresses={addresses}
                onSelect={(address: any) => {
                  setSelectedAddress(address);
                }}
              />
            )}
            {selectedAddress && (
              <button
                className="text-blue-400 text-sm md:text-md font-semibold text-nowrap"
                onClick={() => setSelectedAddress(undefined)}
              >
                change address
              </button>
            )}
          </div>

          <div className="flex justify-center">
            <PaymentMethodSelector />
          </div>

          <button
            className="text-white bg-blue-600 flex items-center justify-center px-4 md:py-4 gap-2 rounded-xl disabled:bg-gray-500"
            onClick={() => {
              if (isLoggedIn) {
                handleCheckout();
              } else {
                window.alert("Please login First");
              }
            }}
            disabled={cartProducts.length === 0}
          >
            <span>Check Out</span>
            {!isLoggedIn && <FaLock />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
