import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import domainsJSON from "../../data/domains.json";
import { domainsFromDomainsJSON } from "../../utils/utils";

export const BuddySystemDashboard = () => {
	const domains = domainsFromDomainsJSON(domainsJSON);
	console.log("domains", domains);
	if ("buddySystem" in domains) {
		console.log("domains", domains["buddySystem"]);
	}
	return (
		<div className="page-heading">
			<h2>Buddy System Dashboard</h2>
			<p>Welcome To the Buddy System</p>
			<Outlet />
		</div>
	);
};
