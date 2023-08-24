import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import lorcanaMickey from "../../../../../images/lorcanaMickey.avif";

export const BrowsePage = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			<div className="page-heading">
				<h2>Lorcana Buddy Browse</h2>
				<img
					src={lorcanaMickey}
					style={{ maxWidth: "400px" }}
					alt="lorcana sorcerer mickey"
				/>
				<h5>Coming soon...</h5>
			</div>
		</>
	);
};