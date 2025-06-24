import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../../store/AuthContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);
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

  return (
    <div className="w-screen h-screen">
      <div className="shadow-2xl h-[10%] flex justify-between box-border p-6">
        <Link to={"/products"} className="bg-neutral-300 rounded px-4">
          Products
        </Link>
        <div className="flex gap-3">
          <Link to={"/profile"} className="bg-neutral-300 px-4 rounded">
            Profile
          </Link>
          <button
            className="text-red-500 font-bold cursor-pointer"
            onClick={(e) => handleUserLogout()}
          >
            Log Out
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
