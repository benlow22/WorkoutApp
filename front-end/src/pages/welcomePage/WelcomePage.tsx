import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export const WelcomePage = () => {
	const { auth } = useContext(AuthContext);

	if (!auth) {
		return (
			<div className="buddy-system-homepage">
				<h1>Welcome to the Buddy System</h1>;
			</div>
		);
	} else {
		return <Navigate to={"workouts"} replace />;
	}
};
