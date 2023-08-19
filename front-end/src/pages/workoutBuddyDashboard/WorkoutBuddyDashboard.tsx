import { Outlet } from "react-router-dom";
import React from "react";

export const WorkoutBuddyDashboard = () => {
	return (
		<div className="page-heading">
			<h2>Workout Buddy Dashboard</h2>
			<Outlet />
		</div>
	);
};
