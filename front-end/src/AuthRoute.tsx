import React from "react";

import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { SpiningLoadingIcon } from "./components/loading/LoadingIcon";

const AuthRoute = () => {
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const location = useLocation();

	useEffect(() => {
		if (!contextIsLoading && auth !== undefined) {
			// console.log("AuthPAge, ", location);
			setIsLoading(false);
		}
	}, [auth]);

	if (!isLoading && auth !== undefined) {
		return auth ? (
			<Outlet />
		) : (
			<Navigate to="/login" state={{ from: location }} />
		);
	} else {
		return <SpiningLoadingIcon />;
	}
};
export default AuthRoute;
