import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedLogin = (isLogged) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      alert("Log in to get access");
      navigate("/login");
    }
  }, [isLogged, navigate]);

  if (isLogged) {
    return <Outlet />;
  }

  // Return null or a loading indicator while redirecting
  return null;
};

export default ProtectedLogin;
