import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";

export const Quiz = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<div className="page-heading">
			<h2>Type Effectiveness Quiz is Coming Soon...</h2>
			<img
				src={sprigatito}
				style={{ maxWidth: "400px" }}
				alt="sprigatito"
			/>
		</div>
	);
};
