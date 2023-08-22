import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export const BuddySystemHomepage = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	// if (!auth) {
	return (
		<div className="buddy-system-homepage">
			<h1>Welcome to the Buddy System</h1>;
		</div>
	);
	// } else {
	// 	return <Navigate to={"workoutBuddy"} replace />;
	// }
};
