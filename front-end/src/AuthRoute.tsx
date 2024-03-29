import React from "react";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { SpiningLoadingIcon } from "./components/loading/LoadingIcon";
import domainsJSON from "./data/domains.json";
import { varFromDomainsJSON } from "./utils/utils";

const TESTAuthRoute = () => {
	const { auth, contextIsLoading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const location = useLocation();
	const [previousDomain, setPreviousDomain] = useState<string>();
	const domains = varFromDomainsJSON(domainsJSON, "domains");

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
		return <Outlet />;
	}
};
export default TESTAuthRoute;
