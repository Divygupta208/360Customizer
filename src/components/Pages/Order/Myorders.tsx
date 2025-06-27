import { Link } from "react-router";
import type { Order } from "../../../store/ProductContext";

const MyOrders = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <div className="p-8 h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
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
