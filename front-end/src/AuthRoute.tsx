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
		if (!contextIsLoading && auth !== undefined) {
			console.log("AuthRoute: location of URL, ", location);
			// extract just DOMAIN
			const splitPathName = location.pathname.split("/");
			console.log("split URL ", splitPathName);
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			setPreviousDomain(subDomain);
			setIsLoading(false);
		}
		if (!contextIsLoading && auth === false) {
			console.log(
				"AuthRoute: location of URL, prev URL when logging out",
				location
			);
			// extract just DOMAIN
			const splitPathName = location.pathname.split("/");
			console.log("split URL ", splitPathName);
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			setPreviousDomain(subDomain);
			setIsLoading(false);
		}
		if (!contextIsLoading && auth === true) {
			console.log("AuthRoute: location of URL, TRUE", location);
			// extract just DOMAIN
			const splitPathName = location.pathname.split("/");
			console.log("split URL ", splitPathName);
			const subDomain =
				splitPathName[1] in domains ? splitPathName[1] : "buddySystem";
			setPreviousDomain(subDomain);
			setIsLoading(false);
		}
	}, [auth]);

	useEffect(() => {
		console.log("AuthRoute: previousDomain: ", previousDomain);
	}, [previousDomain]);

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
