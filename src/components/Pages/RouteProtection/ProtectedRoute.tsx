import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
