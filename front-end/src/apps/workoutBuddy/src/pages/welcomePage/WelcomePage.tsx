import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const WelcomePage = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	if (auth) {
		return <Navigate to={"dashboard"} replace />;
	} else {
		return (
			<div className="buddy-system-homepage">
				<h1>Welcome to the Buddy System</h1>;
			</div>
		);
	}
};
