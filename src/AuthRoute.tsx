import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";

const AuthRoute = () => {
	const { auth } = useContext(AuthContext);
	return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoute;
