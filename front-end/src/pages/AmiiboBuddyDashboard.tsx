import { Outlet } from "react-router-dom";
import React from "react";

export const AmiiboBuddyDashboard = () => {
	return (
		<div className="page-heading">
			<h2>Amiibo Buddy Dashboard</h2>
			<Outlet />
		</div>
	);
};
