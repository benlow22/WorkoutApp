import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";

export const WorkoutBuddyHomepage = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			{auth && (
				<div
					className="page-heading"
					style={{ backgroundColor: "pink" }}
				>
					<h2>Workout Buddy DASHBOARD</h2>
				</div>
			)}
			<div className="page-heading">
				<h2>Workout Buddy HomePage</h2>
			</div>
		</>
	);
};
