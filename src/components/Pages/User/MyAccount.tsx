import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Loading...</div>;
  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">My Account</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border-2 p-4 border-gray-300 rounded-2xl hover:scale-105 transition-all flex flex-col justify-between min-h-[230px]">
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Name: </span>
              {user?.name}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Email: </span>
              {user?.email}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <Link
          to={"/home/myorders"}
          className="border-2 p-4 border-gray-300 rounded-2xl hover:scale-105 transition-all flex flex-col sm:flex-row gap-4 min-h-[230px]"
        >
          <div className="sm:w-[30%] w-full flex justify-center items-center">
            <img
              src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
              className="object-contain h-20"
            />
          </div>
          <div className="sm:w-[70%] flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
            <p className="text-gray-600">View and manage your orders.</p>
          </div>
        </Link>

        <Link
          to={"/home/profile/addresses"}
          className="border-2 p-4 border-gray-300 rounded-2xl hover:scale-105 transition-all flex flex-col sm:flex-row gap-4 min-h-[230px]"
        >
          <div className="sm:w-[30%] w-full flex justify-center items-center">
            <img
              src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
              className="object-contain h-20"
            />
          </div>
          <div className="sm:w-[70%] flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">Your Addresses</h3>
            <p className="text-gray-600">View and manage your addresses.</p>
          </div>
        </Link>
        <Link
          to={"/home/profile/contact-us"}
          className="border-2 p-4 border-gray-300 rounded-2xl hover:scale-105 transition-all flex flex-col sm:flex-row gap-4 min-h-[230px]"
        >
          <div className="sm:w-[30%] w-full flex justify-center items-center">
            <img
              src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png"
              className="object-contain h-20"
            />
          </div>
          <div className="sm:w-[70%] flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">Contact Us?</h3>
            <p className="text-gray-600">Contact our customer supoort.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyAccount;
