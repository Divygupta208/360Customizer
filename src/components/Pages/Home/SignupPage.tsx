import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../store/AuthContext";
import LoginForm, { type LoginFormData } from "../../Forms/LoginForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return <div>Auth context not found</div>;

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      auth.login(data);
      localStorage.setItem("isLoggedIn", "true");
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="w-[50%] min-w-[300px] max-w-[500px] h-[60%] flex flex-col items-center justify-center rounded-2xl shadow-2xl shadow-neutral-600 px-4">
        <div className="font-bold text-2xl mb-10 text-blue-600">Login</div>
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default SignupPage;
