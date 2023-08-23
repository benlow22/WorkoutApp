import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import domainsJSON from "../../data/domains.json";
import { varFromDomainsJSON } from "../../utils/utils";

export const BuddySystemDashboard = () => {
	const domains = varFromDomainsJSON(domainsJSON, "domains");
	return (
		<div className="page-heading">
			<h2>Buddy System Dashboard</h2>
			<p>Welcome To the Buddy System</p>
			<Outlet />
		</div>
	);
};
