import { Link } from "react-router";
import type { Order } from "../../../types/Product";

const MyOrders = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <div className="p-8 h-[70vh] overflow-scroll">
      <p className="text-2xl font-bold mb-4">My Orders</p>
      {orders.length === 0 ? (
        <div className="flex flex-col gap-3 font-semibold md:text-2xl justify-center items-center">
          <p> No orders yet</p>
          <Link
            to={"/home/products"}
            className="bg-black text-white p-2 rounded"
          >
            Explore Now
          </Link>
        </div>
      ) : (
        orders.map((order: Order) => (
          <div key={order.orderId} className="border-b py-4">
            <p className="text-sm">Order ID: {order.orderId}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.date).toLocaleString()}
            </p>
            <p className="text-sm">Items: {order.items?.length}</p>
            <Link
              to={`/home/products/checkout/${order.orderId}`}
              className="text-blue-500 underline"
            >
              View Summary
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
