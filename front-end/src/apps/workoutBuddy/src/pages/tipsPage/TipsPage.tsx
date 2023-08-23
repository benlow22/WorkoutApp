import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import quaxly from "../../../../../images/quaxly.png";

export const TipsPage = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			<div className="page-heading">
				<h2>Workout Buddy Tips</h2>
				<img src={quaxly} style={{ maxWidth: "400px" }} />
				<h5>Coming soon...</h5>
			</div>
		</>
	);
};
