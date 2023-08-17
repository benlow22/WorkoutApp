import React from "react";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { SpiningLoadingIcon } from "./components/loading/LoadingIcon";
import { domains } from "./utils/utils";

const AuthRoute = () => {
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const location = useLocation();
	const [previousDomain, setPreviousDomain] = useState<string>();

	useEffect(() => {
		if (!contextIsLoading && location) {
			const splitPathName = location.pathname.split("/");
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			setPreviousDomain(subDomain);
			setIsLoading(false);
		}
	}, [auth]);

	if (!isLoading && auth !== undefined) {
		return auth ? (
			<Outlet />
		) : (
			<Navigate
				to="/login"
				state={{
					initialUrl: location.pathname,
					previousDomain: previousDomain,
				}}
			/>
		);
	} else {
		return <SpiningLoadingIcon />;
	}
};
export default AuthRoute;
