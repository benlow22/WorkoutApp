import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { SpiningLoadingIcon } from "./components/loading/LoadingIcon";

const AuthRoute = () => {
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			setIsLoading(false);
		}
	}, [auth]);

	if (!isLoading && auth !== undefined) {
		return auth ? <Outlet /> : <Navigate to="/login" />;
	} else {
		return <SpiningLoadingIcon />;
	}
};
export default AuthRoute;
