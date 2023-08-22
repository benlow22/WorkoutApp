import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const BuddySystemDashboard = () => {
	return (
		<div className="page-heading">
			<h2>Buddy System Dashboard</h2>
			<p>Welcome To the Buddy System</p>
			<Outlet />
		</div>
	);
};
