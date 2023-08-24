import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";

export const Returns = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			<div className="page-heading">
				<h2>Amiibo Buddy Returns</h2>
				<img
					src={fuecoco}
					style={{ maxWidth: "400px" }}
					alt="fuecoco"
				/>
				<h5>Coming soon...</h5>
			</div>
		</>
	);
};