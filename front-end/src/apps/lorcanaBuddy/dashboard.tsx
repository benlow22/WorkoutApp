import { Outlet } from "react-router-dom";
import React from "react";

export const LorcanaBuddyDashboard = () => {
	return (
		<div className="page-heading">
			<h2>Lorcana Buddy</h2>
			<Outlet />
		</div>
	);
};
