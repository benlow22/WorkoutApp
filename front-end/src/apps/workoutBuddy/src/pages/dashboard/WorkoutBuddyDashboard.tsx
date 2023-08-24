import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";

export const WorkoutBuddyDashboard = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			{auth && (
				<div className="page-heading">
					<h2>Workout Buddy Dashboard</h2>
				</div>
			)}
			<Outlet />
		</>
	);
};
