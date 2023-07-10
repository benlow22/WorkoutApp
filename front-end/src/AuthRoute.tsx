import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { SpiningLoadingIcon } from "./components/loading/LoadingIcon";

const AuthRoute = () => {
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (contextIsLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [contextIsLoading, auth]);

	if (isLoading) {
		return <SpiningLoadingIcon />;
	}

	if (!auth && !isLoading) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default AuthRoute;
