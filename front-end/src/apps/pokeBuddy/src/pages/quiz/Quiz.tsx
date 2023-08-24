import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";

export const Quiz = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<div className="page-heading">
			<h2>Poke Buddy typeEffect</h2>
			<img
				src={sprigatito}
				style={{ maxWidth: "400px" }}
				alt="sprigatito"
			/>
			<h5>Coming soon...</h5>
		</div>
	);
};
