import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";

const AuthRoute = () => {
    const {userId } =
    useContext(AuthContext);

  return userId ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"}/>
  );
};

export default AuthRoute;