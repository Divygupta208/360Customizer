import { Link, useParams } from "react-router-dom";
import type { Order } from "../../../types/Product";

const OrderSummary = () => {
  const { orderId } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const order = orders.find((o: Order) => o.orderId === orderId);

  const overallPrice = order.items.reduce((acc: any, item: any) => {
    return acc + item.quantity * item.price;
  }, 0);

  if (!order) {
    return (
      <div className="text-center text-red-600 mt-10">Order not found</div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex flex-col md:mt-10">
      <div className="w-full mt-20 md:mt-0 px-4">
        <div className="flex flex-col md:flex-row box-border justify-center md:justify-around items-center">
          <p className="text-xl md:text-4xl font-semibold">
            Order ID: {order.orderId.split("-")[0]}
          </p>
          <div className="flex gap-15 md:gap-20 items-center">
            <div className="border-gray-500 text-gray-400 text-sm">Invoice</div>
            <div className="text-blue-500 rounded md:p-2 text-sm text-nowrap">
              Track Order
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:mt-2 md:justify-around box-border">
          <p className="text-sm md:text-md text-gray-500 gap-5">
            Date: {new Date(order.date).toLocaleString()}
          </p>
          <p className="text-sm md:text-md text-green-500 font-semibold">
            ✈️Estimated Delivery : {new Date(order.date).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="w-full flex-1 overflow-y-auto py-4 flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center items-center w-[90%]">
          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow w-full flex justify-center items-center gap-2"
            >
              <div className="w-[20%] h-[80px]">
                <img
                  src={item?.image}
                  className="object-contain h-full w-full"
                />
              </div>
              <div className="w-[80%] truncate">
                <h2 className="font-semibold">{item.title}</h2>
                <p>Price: ${item.price}</p>
                <p>Qty: {item.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="text-gray-200" />

      <div className="pb-10">
        <div className="payment-delivery w-full flex flex-col md:flex-row justify-between">
          <div className="payment w-full md:w-[50%] p-2 flex flex-col items-center">
            <div className="font-semibold">Payment</div>
            <div className="font-semibold text-blue-400">
              {order?.paymentOption ?? "N/A"}
            </div>
          </div>
          <div className="delivery w-full md:w-[50%] p-2 flex flex-col items-center">
            <div className="font-semibold">Delivery Address</div>
            <div className="flex flex-col justify-center border-2 box-border rounded-lg text-gray-400 p-4 w-fit">
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.localAddress}</p>
              <p>
                {order.shippingAddress.city} , {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.mobile}</p>
            </div>
          </div>
        </div>

        <hr className="text-gray-300 w-[90%] mx-auto" />

        <div className="order-action w-full flex flex-row">
          <div className="actions w-full md:w-[50%] flex p-2 flex-col items-center">
            <div>Need Help ?</div>
            <div className="links flex flex-col">
              <Link to={"#"} className="hover:text-blue-400">
                Order Issue
              </Link>
              <Link to={"#"} className="hover:text-blue-400">
                Delivery Info
              </Link>
              <Link to={"#"} className="hover:text-blue-400">
                Returns
              </Link>
            </div>
          </div>
          <div className="order w-full md:w-[50%] flex p-2 flex-col items-center">
            <div>Order Summary</div>
            <div className="details flex gap-3">
              <div className="flex flex-col text-gray-400">
                <p>Subtotal-</p>
                <p>Discount-</p>
                <p>Delivery-</p>
                <p>GST-</p>
                <hr className="text-black" />
                <p className="font-bold text-black text-lg">Total</p>
              </div>
              <div className="flex flex-col items-end text-gray-400">
                <p>${overallPrice.toFixed(2)}</p>
                <p>${((overallPrice * 5) / 100).toFixed(2)}</p>
                <p>${"10.00"}</p>
                <p>+${((overallPrice * 8) / 100).toFixed(2)}</p>
                <hr />
                <p className="font-bold text-black text-lg">
                  $
                  {(
                    overallPrice +
                    (overallPrice * 5) / 100 +
                    (overallPrice * 8) / 100 +
                    10
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
